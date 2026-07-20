import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should not match empty string when min is greater than 0', () => {
    const matcher = Matcher.for('/+');
    expect(matcher.test('')).toBe(false); // This will pass on original code and fail on mutated code
    expect(matcher.test('/foo')).toBe(true); // This will pass on both original and mutated code
  });
});