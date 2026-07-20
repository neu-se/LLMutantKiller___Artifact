import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'samelevel' when both paths are empty after normalization", () => {
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
    expect(result).toBe("samelevel");
  });
});