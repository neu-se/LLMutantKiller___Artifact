import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly remove fragments with multiple characters from URLs", () => {
    const urlWithFragment = "http://example.com/path#fragment";
    const result = parse(urlWithFragment);
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.search).toBeNull();
  });
});