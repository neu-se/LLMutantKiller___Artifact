import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher behavior with optional segments', () => {
  it('should correctly handle optional segments at the end of the path', () => {
    const matcher = new Matcher('/foo/++');
    expect('/foo'.match(matcher)).not.toBeNull();
    expect('/foo/bar'.match(matcher)).not.toBeNull();
    expect('/foo/'.match(matcher)).toBeNull();
  });
});