import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly handle undefined pageurl.path when comparing paths", () => {
    const linkurl = {
      url: "https://example.com/path",
      path: "/path",
      host: "example.com",
      domain: "example.com",
      subdomain: null
    };
    const pageurl = {
      url: "https://example.com",
      path: undefined,
      host: "example.com",
      domain: "example.com",
      subdomain: null
    };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});