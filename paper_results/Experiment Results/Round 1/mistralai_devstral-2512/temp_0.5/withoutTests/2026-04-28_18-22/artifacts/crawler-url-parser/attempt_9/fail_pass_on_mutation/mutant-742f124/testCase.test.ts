import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with fragment handling", () => {
  it("should strip fragments from URLs when stripFragment is true", () => {
    const urlWithFragment = "http://example.com/path#fragment";
    const result = parse(urlWithFragment);
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.url).not.toContain("#fragment");
  });
});