import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser parse function", () => {
  it("should return null for a URL with illegal characters like spaces", () => {
    // The URL "https ://www.npmjs.com/package/electron-window-manager" has a space
    // which is an illegal character, so parse should return null
    const url = "https ://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    // In the original code, the if block body exists and references this URL
    // The parse function should return null due to illegal space character
    expect(result).toBeNull();
  });
});