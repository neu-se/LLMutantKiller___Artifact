import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype with pageurl having no path", () => {
  it("should return 'sublevel' when linkurl has one path segment and pageurl has no path", () => {
    const linkurl = {
      url: "http://example.com/about",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "/about",
      search: null,
      querycount: 0
    };

    const pageurl = {
      url: "http://example.com",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: null,
      search: null,
      querycount: 0
    };

    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});