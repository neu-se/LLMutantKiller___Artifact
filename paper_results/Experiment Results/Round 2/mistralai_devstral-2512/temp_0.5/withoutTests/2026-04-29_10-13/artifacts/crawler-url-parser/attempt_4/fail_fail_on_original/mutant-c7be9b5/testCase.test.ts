import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle URLs with spaces in protocol when module is run directly", () => {
    const url = "https ://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://www.npmjs.com/package/electron-window-manager");
  });
});