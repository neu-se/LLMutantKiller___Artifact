import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with fragment handling", () => {
  it("should correctly remove fragments from URLs with multiple characters after #", () => {
    const urlWithFragment = "http://example.com/path#fragment123";
    const result = parse(urlWithFragment);
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.search).toBe("");
    expect(result?.path).toBe("/path");
  });
});