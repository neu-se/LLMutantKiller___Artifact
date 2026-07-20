import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard behavior', () => {
  it('should correctly handle optional segments with min=0 in nested patterns', () => {
    const matcher = Matcher.for('/:foo/++/:bar');
    const testPath = '/test/value';
    const result = testPath.match(matcher);
    expect(result).not.toBeNull();
    expect(result?.[0]).toBe('/test/value');
    expect(result?.[1]).toBe('test');
    expect(result?.[2]).toBe('value');
  });
});