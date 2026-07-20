import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly classify same-level URLs when path is empty string", () => {
    const linkUrl = {
      url: "https://example.com",
      protocol: "https:",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "",
      search: "",
      querycount: 0
    };
    const pageUrl = {
      url: "https://example.com",
      protocol: "https:",
      host: "example.com",
      domain: "example.com",
      subdomain: null,
      path: "",
      search: "",
      querycount: 0
    };
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});