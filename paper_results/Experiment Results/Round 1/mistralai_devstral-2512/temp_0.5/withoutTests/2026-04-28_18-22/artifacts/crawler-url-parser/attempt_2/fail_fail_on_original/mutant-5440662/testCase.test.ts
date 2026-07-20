import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify link type when pageurl.path is undefined", () => {
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
      url: "http://example.com",
      protocol: "http:",
      host: "example.com",
      path: undefined,
      domain: "example.com",
      subdomain: null,
      search: "",
      querycount: 0
    };

    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});