import {
  ApiPath,
  ContactsApiPath,
  ContentType,
  HttpMethod,
} from '@/common/enums';

class Contact {
  _apiPath: string | undefined;
  _http: any;

  constructor({ apiPath, http }: { apiPath: string | undefined; http: any }) {
    this._apiPath = apiPath;
    this._http = http;
  }

  getAllContacts(filter: object) {
    return this._http.load(`${this._apiPath}${ApiPath.CONTACTS}`, {
      method: HttpMethod.GET,
      query: filter,
    });
  }

  getContact(id: string) {
    return this._http.load(
      `${this._apiPath}${ApiPath.CONTACTS}${ContactsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  addContact(payload: object) {
    return this._http.load(
      `${this._apiPath}${ApiPath.CONTACTS}${ContactsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      }
    );
  }

  removeContact(id: string) {
    return this._http.load(
      `${this._apiPath}${ApiPath.CONTACTS}${ContactsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}

export { Contact };
