// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function behavior with localhost URLs', () => {
  it('should correctly handle localhost URLs without protocol', () => {
    const result = parse("localhost:3000/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://localhost:3000/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("localhost:3000");
    expect(result?.path).toBe("/path");
  });
});