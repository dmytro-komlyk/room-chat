import { ENV } from '@/common/enums';
import { Http } from './httpServices';
import { Room } from './roomServices';

const http = new Http({
  siteUrl: ENV.SITE_URL,
});

const roomServices = new Room({
  apiPath: ENV.API_PATH,
  http,
});

export { http, roomServices };
