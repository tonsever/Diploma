import "../vendor/normalize.css";
import "../pages/index.css";
import { DataStorage } from '../js/modules/DataStorage.js';
import { Statistics } from '../js/components/Statistics.js';

const analytics = document.querySelector('.analytics');
const youSked = document.querySelector('.you-sked');

const dataStorage = new DataStorage('keyWord', 'news', 'day');
const statistics = new Statistics(analytics, youSked, dataStorage.getKeyWord(), dataStorage.getNews(), dataStorage.getDay());

statistics.setWeekdays();
statistics.setYouSkedFields();
statistics.setMonth();
statistics.setScale();








