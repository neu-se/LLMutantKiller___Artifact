import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should match when min is 0 and max is greater than 0', () => {
    const matcher = new Matcher('/++', '1.1');
    const result = matcher[Symbol.match]('/');
    expect(result).not.toBeNull();
    const matcher2 = new Matcher('/++', '1.1');
    const result2 = matcher2[Symbol.match]('/foo');
    expect(result2).not.toBeNull();
  });
});