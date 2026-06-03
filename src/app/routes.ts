import {Routes} from '@angular/router';
import {DetailsComponent} from './details/details.component';
import {HomeComponent} from './home/home.component';

const routeConfig: Routes = [
	{
		path: '',
		component: HomeComponent,
		title: 'Home Gallery',
	},
	{
		path: 'details/:id',
		component: DetailsComponent,
		title: 'Location Details',
	},
	{
		path: '**',
		redirectTo: '',
	},
];

export default routeConfig;