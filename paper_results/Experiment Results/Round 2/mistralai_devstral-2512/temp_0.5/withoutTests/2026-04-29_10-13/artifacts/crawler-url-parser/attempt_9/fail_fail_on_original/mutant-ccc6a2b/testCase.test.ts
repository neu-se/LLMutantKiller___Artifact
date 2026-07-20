import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function behavior", () => {
  it("should handle URLs with spaces in protocol when run as main module", () => {
    // This test specifically targets the difference between having/not having
    // the testing code block that handles URLs with spaces in protocol
    const url = "https ://www.npmjs.com/package/electron-window-manager";
    const result = parse(url);

    // The original code with the testing block would handle this differently
    // than the mutated version without it
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://www.npmjs.com/package/electron-window-manager");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("www.npmjs.com");
  });
});