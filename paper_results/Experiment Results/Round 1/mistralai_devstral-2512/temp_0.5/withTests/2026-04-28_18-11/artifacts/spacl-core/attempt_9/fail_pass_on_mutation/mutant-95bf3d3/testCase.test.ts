import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher behavior with optional segments', () => {
  it('should correctly handle optional segments with min=0 in specific edge case', () => {
    const matcher = new Matcher('/++');
    expect('/'.match(matcher)).not.toBeNull();
    expect('/foo'.match(matcher)).not.toBeNull();
    expect('/foo/bar'.match(matcher)).toBeNull();
    expect('/foo/bar/'.match(matcher)).toBeNull();
  });
});