import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should handle URLs with spaces in protocol", () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://www.npmjs.com/package/electron-window-manager");
    expect(result?.protocol).toBe("https:");
    expect(result?.host).toBe("www.npmjs.com");
    expect(result?.path).toBe("/package/electron-window-manager");
  });
});