import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard behavior', () => {
  it('should correctly handle optional segments with min=0', () => {
    const matcher = Matcher.for('/++/foo');
    const testPath = '/foo';
    const result = testPath.match(matcher);
    expect(result).not.toBeNull();
    expect(result?.[0]).toBe('/foo');
  });
});