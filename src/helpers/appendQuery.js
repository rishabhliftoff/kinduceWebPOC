export default function appendQuery(uri, param) {
  let url = uri;
  url += (url.split('?')[1] ? '&' : '?') + param;
  return url;
}
