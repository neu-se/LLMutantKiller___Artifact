import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters regex anchor', () => {
  it('should not remove query parameters that have utm_ in the middle of the name', () => {
    // Original /^utm_\w+/i: only removes params STARTING with utm_
    // Mutated /utm_\w+/i: removes params CONTAINING utm_ anywhere
    // Parameter "source_utm_id" contains utm_ but doesn't start with it
    // Original keeps it, mutant removes it
    const result = parse('http://example.com/?source_utm_id=abc');
    expect(result).not.toBeNull();
    expect(result!.search).toContain('source_utm_id');
  });
});