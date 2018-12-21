import { dataService } from './data.service';

export const appData = () => dataService.get('/api/applicationdata');
