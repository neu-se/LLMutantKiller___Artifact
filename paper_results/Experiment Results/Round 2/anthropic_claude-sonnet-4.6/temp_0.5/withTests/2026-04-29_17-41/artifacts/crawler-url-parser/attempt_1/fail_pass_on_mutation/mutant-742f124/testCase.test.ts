import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('fragment stripping behavior', () => {
  it('should strip fragment from URL when parsing with base URL', () => {
    const result = parse("#start-of-content", "https://github.com/Microsoft");
    expect(result).not.toBeNull();
    expect(result.url).toBe("https://github.com/Microsoft");
    expect(result.url).not.toContain("#");
  });
});