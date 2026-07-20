import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should not match empty string when min is 0 and max is undefined', () => {
    const matcher = Matcher.for('/*');
    expect(matcher.test('')).toBe(false); // This will pass on original code and fail on mutated code
  });
});