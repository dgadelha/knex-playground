export function encodeForUrl(str: string) {
  return btoa(encodeURIComponent(str));
}

export function decodeFromUrl(str: string) {
  return decodeURIComponent(atob(str));
}
