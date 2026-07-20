import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should not match empty string when min is 0', () => {
    const matcher = Matcher.for('/*');
    expect(matcher.test('')).toBe(false);
  });
});