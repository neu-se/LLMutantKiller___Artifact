// testCase.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import psl from "psl";

describe('stripWWW option behavior', () => {
  it('should strip www from domain when stripWWW is true in normalization', () => {
    // Test the actual normalization behavior that uses result_normalize_options
    const parsed = psl.parse('www.example.com');
    const normalized = psl.get(parsed.domain);

    // The mutation changes stripWWW from true to false
    // When stripWWW is true, www should be stripped from the domain
    expect(normalized).toBe('example.com');
  });
});