// test/normalizeHttps.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('normalizeHttps option behavior', () => {
  it('should not change https to http when normalizeHttps is false', () => {
    const result = parse("https://www.example.com");
    expect(result?.url).toBe("https://www.example.com/");
    expect(result?.protocol).toBe("https:");
  });
});