import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should fail when min is greater than 0 and final is true and opt is true', () => {
    const matcher = new Matcher('/+/*', '1.1');
    const result = matcher[Symbol.match]('/foo/bar');
    expect(result).not.toBeNull();
  });
});