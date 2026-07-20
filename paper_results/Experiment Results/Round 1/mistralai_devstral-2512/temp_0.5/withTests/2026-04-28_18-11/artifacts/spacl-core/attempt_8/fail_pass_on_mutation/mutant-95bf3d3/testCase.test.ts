import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher behavior with optional segments', () => {
  it('should correctly handle optional segments with min=0 and final flatten', () => {
    const matcher = new Matcher('/++');
    const result = '/'.match(matcher);
    expect(result).not.toBeNull();
    expect(result?.[0]).toBe('/');
    expect('/foo'.match(matcher)).not.toBeNull();
    expect('/foo/bar'.match(matcher)).toBeNull();
  });
});