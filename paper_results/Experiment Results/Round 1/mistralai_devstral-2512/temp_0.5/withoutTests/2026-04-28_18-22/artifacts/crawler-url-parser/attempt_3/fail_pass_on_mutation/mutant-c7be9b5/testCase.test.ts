import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should handle valid URLs correctly", () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://www.npmjs.com/package/electron-window-manager");
  });
});