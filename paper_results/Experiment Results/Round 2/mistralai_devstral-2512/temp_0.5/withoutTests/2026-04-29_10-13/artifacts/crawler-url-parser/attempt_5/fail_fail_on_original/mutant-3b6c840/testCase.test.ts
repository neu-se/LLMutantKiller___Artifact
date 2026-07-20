import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("URL normalization with trailing slashes", () => {
  it("should normalize URLs by removing trailing slashes from paths", () => {
    const testCases = [
      { input: "http://example.com/path/", expectedPath: "/path" },
      { input: "http://example.com/path", expectedPath: "/path" },
      { input: "http://example.com/dir/subdir/", expectedPath: "/dir/subdir" },
      { input: "http://example.com/dir/subdir", expectedPath: "/dir/subdir" }
    ];

    testCases.forEach(({ input, expectedPath }) => {
      const result = parse(input);
      expect(result?.path).toBe(expectedPath);
    });
  });
});