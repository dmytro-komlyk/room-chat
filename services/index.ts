import { ENV } from '@/common/enums';
import { Chat } from './chatServices';
import { Contact } from './contactServices';
import { Http } from './httpServices';
import { Room } from './roomServices';

const http = new Http({
  siteUrl: ENV.SITE_URL,
});

const roomServices = new Room({
  apiPath: ENV.API_PATH,
  http,
});

const chatServices = new Chat({
  apiPath: ENV.API_PATH,
  http,
});

const contactServices = new Contact({
  apiPath: ENV.API_PATH,
  http,
});

export { chatServices, contactServices, http, roomServices };
