import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should correctly parse URLs with spaces when module is not parent", () => {
    const url = "https ://www.npmjs.com/package/electron-window-parser";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://www.npmjs.com/package/electron-window-parser");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("www.npmjs.com");
  });
});