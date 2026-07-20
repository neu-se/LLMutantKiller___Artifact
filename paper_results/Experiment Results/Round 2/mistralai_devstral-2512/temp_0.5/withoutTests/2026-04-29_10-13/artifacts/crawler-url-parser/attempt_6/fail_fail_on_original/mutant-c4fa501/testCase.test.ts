import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function directory index handling", () => {
  it("should normalize paths with index.html to parent directory", () => {
    const testCases = [
      { input: "http://example.com/index.html", expected: "/" },
      { input: "http://example.com/path/index.html", expected: "/path/" },
      { input: "http://example.com/path/default.htm", expected: "/path/" },
      { input: "http://example.com/path/index.php", expected: "/path/" }
    ];

    testCases.forEach(({ input, expected }) => {
      const result = parse(input);
      expect(result?.path).toBe(expected);
    });
  });
});