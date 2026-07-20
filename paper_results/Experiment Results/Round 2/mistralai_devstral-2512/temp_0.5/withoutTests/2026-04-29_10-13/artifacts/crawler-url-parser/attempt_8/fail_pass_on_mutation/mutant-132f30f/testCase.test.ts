import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function URL handling", () => {
  it("should maintain exact host format including www prefix", () => {
    const testCases = [
      { input: "http://www.example.com", expectedHost: "www.example.com" },
      { input: "http://example.com", expectedHost: "example.com" },
      { input: "https://www.test.org/path", expectedHost: "www.test.org" },
      { input: "https://test.org/path", expectedHost: "test.org" }
    ];

    testCases.forEach(({ input, expectedHost }) => {
      const result = parse(input);
      expect(result?.host).toBe(expectedHost);
    });
  });
});