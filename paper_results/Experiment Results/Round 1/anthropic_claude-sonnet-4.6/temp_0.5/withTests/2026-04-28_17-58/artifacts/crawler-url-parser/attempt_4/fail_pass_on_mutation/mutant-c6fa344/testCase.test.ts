import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should parse URL with no protocol and no baseUrl', () => {
    // Testing the http:// prepending logic
    // The mutation changes /^(?!(?:\w+:)?\/\/)/ to /^(?!(?:\w+:)\/\/)/
    // For a URL like "google.com", both prepend http://
    // But the behavior differs for strings starting with //
    const res = parse("google.com");
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://google.com/");
  });
});