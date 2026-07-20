import { parse } from "./crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly parse a URL with spaces around the protocol", () => {
    const url = "https ://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://www.npmjs.com/package/electron-window-manager");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("www.npmjs.com");
  });
});