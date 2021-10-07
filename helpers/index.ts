import axios, { AxiosInstance, AxiosPromise } from 'axios';

function buildAxios(axiosInfo = {}): AxiosInstance {
  const x = axios.create(axiosInfo);
  x.defaults.timeout = 5000; //180000
  return x;
}

// fetch with time out to deal with cors errors
export async function fetchWithTimeout(
  url: string,
): Promise<AxiosPromise<any>> {
  const fetch = buildAxios();

  return fetch.get(url);
}
