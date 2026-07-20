import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'external' when pageurl.path is undefined and domains differ", () => {
    const linkurl = {
      url: "http://example.com/path",
      protocol: "http:",
      host: "example.com",
      path: "/path",
      domain: "example.com",
      subdomain: null,
      search: "",
      querycount: 0
    };
    const pageurl = {
      url: "http://different.com",
      protocol: "http:",
      host: "different.com",
      path: undefined,
      domain: "different.com",
      subdomain: null,
      search: "",
      querycount: 0
    };

    const result = gettype(linkurl, pageurl);
    expect(result).toBe("external");
  });
});