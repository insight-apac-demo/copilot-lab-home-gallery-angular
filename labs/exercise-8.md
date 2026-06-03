
# Exercise 8: Build a Production Docker Image

## Goal

Understand and run a multi-stage Docker build that creates a lightweight production container for the Angular app.

By the end of this exercise, you should be able to:
- explain the purpose of build and runtime stages in a Dockerfile
- build a production image locally and run it with port mapping
- verify the containerized app behaves like the local dev app

## Part 1: Review the multi-stage Dockerfile

Open `Dockerfile` at the project root. A multi-stage build compiles the app in one stage (with dependencies) and serves it in a smaller stage (without build tools):

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/dist/home-gallery/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Breakdown:
1. **Build stage** - Use Node 20 Alpine (lightweight Linux), install dependencies, compile Angular
2. **Serve stage** - Use Nginx Alpine (super lightweight), copy only the compiled files from stage 1, expose port 80

The final image contains *only* Nginx and static files—no Node, no source code. This keeps the production image small (typically <50 MB).

Ask Copilot to explain any part:

```text
Explain why we use two FROM statements in this Dockerfile and what the --from=build syntax does.
```

<details>
  <summary>Why multi-stage?</summary>
  Node is ~400 MB. Nginx is ~10 MB. After compilation, you don't need Node anymore. Multi-stage discards the build stage from the final image, saving space and reducing attack surface.
</details>

## Part 2: Build the Docker image

If Docker is installed on your machine, open a terminal and run:

```bash
docker build -t home-gallery-angular .
```

This:
- `-t home-gallery-angular` - names the image `home-gallery-angular`
- `.` - builds from the `Dockerfile` in the current directory

You should see output like:
```
Step 1/10 : FROM node:20-alpine AS build
...
Step 10/10 : CMD ["nginx", "-g", "daemon off;"]
Successfully built abc123def456
Successfully tagged home-gallery-angular:latest
```

<details>
  <summary>No Docker installed?</summary>
  Review the Dockerfile with Copilot and move to the next exercise. Docker is optional for this workshop—the app works perfectly with `npm start`.
</details>

## Part 3: Run the container locally

Once the build completes, run the image:

```bash
docker run --rm -p 8080:80 home-gallery-angular
```

This:
- `--rm` - automatically clean up the stopped container
- `-p 8080:80` - map port 8080 on your machine to port 80 inside the container
- `home-gallery-angular` - the image name

You should see:
```
/docker-entrypoint.sh: Configuration complete; ready for start up
ngx_http_ssl_module was built without SSL support
```

Now open `http://localhost:8080` in your browser. The app should load and work normally.

<details>
  <summary>What if the port is already in use?</summary>
  Change `8080` to another port, like `8081` or `9000`:
  ```bash
docker run --rm -p 9000:80 home-gallery-angular
```
  Then visit `http://localhost:9000`.
</details>

## Part 4: Stop the container

Press `Ctrl+C` in the terminal to stop the running container.

## Checkpoint

✓ `docker build -t home-gallery-angular .` completes successfully  
✓ `docker run --rm -p 8080:80 home-gallery-angular` starts and shows Nginx startup messages  
✓ The app is accessible at `http://localhost:8080`  
✓ All features work (home page, filtering, details, form)  
✓ Container stops cleanly with Ctrl+C  

Optional: Ask Copilot how to optimize the Dockerfile further:

```text
What changes could we make to the Dockerfile to reduce build time or final image size?
```

---

[Previous](./exercise-7.md) | [Next](./exercise-9.md)