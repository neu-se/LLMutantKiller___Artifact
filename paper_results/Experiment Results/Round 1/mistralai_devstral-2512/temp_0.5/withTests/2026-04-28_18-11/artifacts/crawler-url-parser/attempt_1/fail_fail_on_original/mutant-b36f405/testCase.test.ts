import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("Query parameter removal mutation test", () => {
  it("should remove utm_ parameters with underscores but not other special characters", () => {
    const urlWithUnderscore = "http://example.com/path?utm_source=test&other=value";
    const result = parse(urlWithUnderscore);
    expect(result.url).toBe("http://example.com/path?other=value");
  });
});