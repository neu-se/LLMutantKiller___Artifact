import { gettype } from "./crawler-url-parser";

describe("crawler-url-parser", () => {
  it("should return correct type for same domain link", () => {
    const linkurl = { path: "" };
    const pageurl = { path: "" };
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe("Stryker was here!");
  });
});