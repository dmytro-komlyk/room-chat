import { ApiPath, ChatsApiPath, ContentType, HttpMethod } from '@/common/enums';

class Chat {
  _apiPath: string | undefined;
  _http: any;

  constructor({ apiPath, http }: { apiPath: string | undefined; http: any }) {
    this._apiPath = apiPath;
    this._http = http;
  }

  getAllChats(filter: object) {
    return this._http.load(`${this._apiPath}${ApiPath.CHATS}`, {
      method: HttpMethod.GET,
      query: filter,
    });
  }

  getChat(id: string) {
    return this._http.load(
      `${this._apiPath}${ApiPath.CHATS}${ChatsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  addChat(payload: object) {
    return this._http.load(
      `${this._apiPath}${ApiPath.CHATS}${ChatsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      }
    );
  }

  updateChat({ id, payload }: { id: string; payload: object }) {
    return this._http.load(
      `${this._apiPath}${ApiPath.CHATS}${ChatsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      }
    );
  }

  removeChat(id: string) {
    return this._http.load(
      `${this._apiPath}${ApiPath.CHATS}${ChatsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}

export { Chat };
