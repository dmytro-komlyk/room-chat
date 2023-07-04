import { ApiPath, ContentType, HttpMethod, RoomsApiPath } from '@/common/enums';

class Room {
  _apiPath: string | undefined;
  _http: any;

  constructor({ apiPath, http }: { apiPath: string | undefined; http: any }) {
    this._apiPath = apiPath;
    this._http = http;
  }

  getAllRooms(filter: object) {
    return this._http.load(`${this._apiPath}${ApiPath.ROOMS}`, {
      method: HttpMethod.GET,
      query: filter,
    });
  }

  getRoom(id: string) {
    return this._http.load(
      `${this._apiPath}${ApiPath.ROOMS}${RoomsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      }
    );
  }

  addRoom(payload: object) {
    return this._http.load(
      `${this._apiPath}${ApiPath.ROOMS}${RoomsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      }
    );
  }

  updateRoom({ id, payload }: { id: string; payload: object }) {
    return this._http.load(
      `${this._apiPath}${ApiPath.ROOMS}${RoomsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      }
    );
  }

  removeRoom(id: string) {
    return this._http.load(
      `${this._apiPath}${ApiPath.ROOMS}${RoomsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.DELETE,
      }
    );
  }
}

export { Room };
