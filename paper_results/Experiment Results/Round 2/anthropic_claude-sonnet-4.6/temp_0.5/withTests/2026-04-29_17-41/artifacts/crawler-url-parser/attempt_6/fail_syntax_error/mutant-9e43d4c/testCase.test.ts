if (this.host) {
  host = auth + this.host;
} else if (this.hostname) {
  // ...
}
// ...
if (this.slashes || ((protocol === 'https:' || ...) && !noSlashes)) {
  newPathname = '//' + (host || '') + (pathname && pathname.charCodeAt(0) !== 47 ? '/' + pathname : pathname);
} else if (host) {
  newPathname = '//' + host + ...;
} else {
  newPathname = pathname;
}