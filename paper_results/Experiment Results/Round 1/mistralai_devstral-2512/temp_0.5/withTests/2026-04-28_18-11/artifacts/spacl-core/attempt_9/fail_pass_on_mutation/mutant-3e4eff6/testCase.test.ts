import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher optional segment behavior', () => {
  it('should correctly match when optional segment is omitted and followed by required segment', () => {
    const matcher = Matcher.for('/++/bar');
    const testPath = '/bar';
    const result = testPath.match(matcher);
    expect(result).not.toBeNull();
    expect(result?.[0]).toBe('/bar');
  });
});