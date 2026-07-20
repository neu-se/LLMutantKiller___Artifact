import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should handle URLs with spaces by returning null", () => {
    const url = "https ://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).toBeNull();
  });
});