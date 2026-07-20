import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should correctly handle URLs with spaces when module is not parent", () => {
    const url = "https://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("https://www.npmjs.com/package/electron-window-manager");
    expect(result?.protocol).toBe("https:");
    expect(result?.host).toBe("www.npmjs.com");
  });
});