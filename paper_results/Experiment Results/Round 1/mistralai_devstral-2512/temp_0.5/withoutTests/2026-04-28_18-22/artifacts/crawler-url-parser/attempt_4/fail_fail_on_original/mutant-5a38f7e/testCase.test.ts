import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify link type when linkurl.path is undefined and pageurl.path contains specific pattern", () => {
    const linkurl = {
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: undefined
    };
    const pageurl = {
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "/index.html"
    };

    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});