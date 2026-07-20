import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should handle URLs with spaces by returning null", () => {
    const result = parse("https ://www.npmjs.com/package/electron-window-manager");
    expect(result).toBeNull();
  });
});