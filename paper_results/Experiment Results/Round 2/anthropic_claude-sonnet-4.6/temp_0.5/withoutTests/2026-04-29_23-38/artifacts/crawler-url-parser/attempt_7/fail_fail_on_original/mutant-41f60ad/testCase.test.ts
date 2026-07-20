Url.prototype.format = function format() {
  var auth = this.auth;
  if (auth) {
    auth = encodeAuth(auth);
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    // ...
  }

  if (this.query !== null &&
      typeof this.query === 'object') {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (pathname) {
    if (pathname.charAt(0) !== '/' &&
        typeof this.host !== 'undefined' && this.host !== null) {
      // ...
    }
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + (this.slashes ? '//' : '') +
         (host || '') + pathname + search + hash;
};