// test/normalizeHttps.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('normalizeHttps option behavior', () => {
  it('should preserve https protocol when normalizeHttps is false', () => {
    const result = parse("https://www.example.com/path");
    expect(result?.url).toBe("https://www.example.com/path");
    expect(result?.protocol).toBe("https:");
  });
});