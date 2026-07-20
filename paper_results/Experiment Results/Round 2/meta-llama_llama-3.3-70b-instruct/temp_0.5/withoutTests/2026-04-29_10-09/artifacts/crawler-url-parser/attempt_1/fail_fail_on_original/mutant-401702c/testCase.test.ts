import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse URLs with special characters', () => {
    const url = "https://www.example.com/path?param=value&another=param";
    const expected = {
      url: "https://www.example.com/path",
      baseurl: null,
      protocol: "https:",
      host: "www.example.com",
      domain: "example.com",
      subdomain: "www",
      path: "/path",
      search: "?param=value&another=param",
      querycount: 2,
    };
    expect(parse(url)).toEqual(expected);
  });
});