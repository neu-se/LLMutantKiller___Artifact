import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher behavior with optional segments', () => {
  it('should correctly match empty path with optional segment', () => {
    const matcher = new Matcher('/++');
    expect('/'.match(matcher)).not.toBeNull();
    expect(''.match(matcher)).toBeNull();
  });
});