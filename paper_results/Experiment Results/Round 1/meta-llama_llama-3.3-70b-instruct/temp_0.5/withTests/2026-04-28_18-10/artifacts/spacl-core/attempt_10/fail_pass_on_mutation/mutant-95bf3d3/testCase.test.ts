import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should not match empty string', () => {
    const matcher = Matcher.for('/+');
    expect(matcher.test('')).toBe(false); // This will pass on original code
    const matcher2 = Matcher.for('/**');
    expect(matcher2.test('')).toBe(false); // This will pass on original code and fail on mutated code if min >= 0
  });
});