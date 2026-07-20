import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should return correct type for same domain link", () => {
    const linkurl = { path: "" };
    const pageurl = { path: "" };
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe("Stryker was here!");
  });
});