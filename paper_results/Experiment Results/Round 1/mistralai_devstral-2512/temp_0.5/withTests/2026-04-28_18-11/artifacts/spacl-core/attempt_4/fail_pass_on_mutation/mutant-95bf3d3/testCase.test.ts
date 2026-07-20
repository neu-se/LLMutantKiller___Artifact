import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher behavior with optional segments', () => {
  it('should correctly handle empty path with optional segment when min=0', () => {
    const matcher = new Matcher('/++');
    const result = '/'.match(matcher);
    expect(result).not.toBeNull();
    expect(result?.[0]).toBe('/');
  });
});