import { format } from 'date-fns';

/* Formats current month-day-year for todos object and 
year-month-day for date input field in add-new popup form */
const dateObject = new Date();
const month: string = format(dateObject, 'MM');
const day: string = format(dateObject, 'dd');
const year: string = format(dateObject, 'yyyy');
export const today: string = `${month}-${day}-${year}`;
export const currentDay: string = `${year}-${month}-${day}`;

/* Formats month-day-year one week ago */
const weekPast = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate() - 7);
const weekAgoMonth: string = format(weekPast, 'MM');
const weekAgoDay: string = format(weekPast, 'dd');
const weekAgoYear: string = format(weekPast, 'yyyy');
export const weekAgo: string = `${weekAgoMonth}-${weekAgoDay}-${weekAgoYear}`;

/* Formats month-day-year one week from now */
const weekFuture = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate() + 5);
const weekFutureMonth: string = format(weekFuture, 'MM');
const weekFutureDay: string = format(weekFuture, 'dd');
const weekFutureYear: string = format(weekFuture, 'yyyy');
export const weekNext: string = `${weekFutureMonth}-${weekFutureDay}-${weekFutureYear}`;

/* Formats month-day-year one month from now */
const monthFuture = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate() + 32);
const monthFutureMonth: string = format(monthFuture, 'MM');
const monthFutureDay: string = format(monthFuture, 'dd');
const monthFutureYear: string = format(monthFuture, 'yyyy');
export const monthNext: string = `${monthFutureMonth}-${monthFutureDay}-${monthFutureYear}`;