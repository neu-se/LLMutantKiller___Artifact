import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should not return undefined for linkurl_path when path is empty", () => {
    const linkurl = { path: "" };
    const pageurl = { path: "" };
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBeUndefined();
  });
});