import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard behavior', () => {
  it('should correctly handle optional segments with min=0 when path has no optional segment', () => {
    const matcher = Matcher.for('/++/bar');
    const testPath = '/bar';
    const result = testPath.match(matcher);
    expect(result).not.toBeNull();
    expect(result?.[0]).toBe('/bar');
  });
});