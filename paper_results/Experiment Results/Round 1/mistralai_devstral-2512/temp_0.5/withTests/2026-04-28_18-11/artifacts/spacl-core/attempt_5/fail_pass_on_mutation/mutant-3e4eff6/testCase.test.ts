import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard behavior', () => {
  it('should correctly handle optional segments with min=0 in complex patterns', () => {
    const matcher = Matcher.for('/foo/++/bar');
    const testPath = '/foo/bar';
    const result = testPath.match(matcher);
    expect(result).not.toBeNull();
    expect(result?.[0]).toBe('/foo/bar');
  });
});