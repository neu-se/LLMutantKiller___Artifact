// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('stripWWW option behavior', () => {
  it('should strip www from domain when stripWWW is true', () => {
    const result = parse("http://www.example.com/path");
    expect(result).not.toBeNull();
    expect(result?.host).toBe("www.example.com");
    expect(result?.url).toBe("http://www.example.com/path");
    expect(result?.domain).toBe("example.com");
  });
});