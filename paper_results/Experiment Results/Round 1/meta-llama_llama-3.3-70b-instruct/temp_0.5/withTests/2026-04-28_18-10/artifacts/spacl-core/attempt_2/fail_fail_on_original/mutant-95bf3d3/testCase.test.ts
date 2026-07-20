import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should not match empty string when min is 0', () => {
    const matcher = Matcher.for('/**');
    expect(matcher.test('')).toBe(true); // This will pass on mutated code but fail on original code
    const matcher2 = Matcher.for('/+');
    expect(matcher2.test('')).toBe(false); // This will pass on both original and mutated code, but the first assertion will fail on original code
  });
});