import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should not match when min is greater than 0 and final is true and opt is true and min is less than 1', () => {
    const matcher = new Matcher('/+/*', '1.1');
    const result = matcher[Symbol.match]('/');
    expect(result).toBeNull();
  });
});