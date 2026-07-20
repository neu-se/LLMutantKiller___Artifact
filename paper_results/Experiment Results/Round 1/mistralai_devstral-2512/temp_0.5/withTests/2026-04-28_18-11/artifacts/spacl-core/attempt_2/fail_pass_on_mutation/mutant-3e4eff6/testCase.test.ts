import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard behavior', () => {
  it('should correctly handle optional segments with min=0 and trailing slash', () => {
    const matcher = Matcher.for('/++');
    const testPath = '/';
    const result = testPath.match(matcher);
    expect(result).not.toBeNull();
    expect(result?.[0]).toBe('/');
  });
});