import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should match single segment when min is 0', () => {
    const matcher = Matcher.for('/+');
    expect(matcher.test('/foo')).toBe(true);
    expect(matcher.test('')).toBe(false); // This will pass on original code but fail on mutated code
  });
});