import { gettype } from "./crawler-url-parser.js";

describe("gettype function", () => {
  it("should correctly identify link type when linkurl.path is undefined", () => {
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
      path: "/some/path"
    };

    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});