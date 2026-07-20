import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher behavior with optional segments', () => {
  it('should correctly handle optional segments with min=0 in complex patterns', () => {
    const matcher = new Matcher('/foo/++/bar');
    expect('/foo/bar'.match(matcher)).not.toBeNull();
    expect('/foo/boo/bar'.match(matcher)).not.toBeNull();
    expect('/foo/bar/boo'.match(matcher)).toBeNull();
  });
});