import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL fragment handling", () => {
  it("should strip fragments from URLs when stripFragment is true", () => {
    const urlWithFragment = "http://example.com/path?q=query#fragment";
    const result = parse(urlWithFragment);
    expect(result?.url).toBe("http://example.com/path?q=query");
    expect(result?.search).toBe("?q=query");
  });
});