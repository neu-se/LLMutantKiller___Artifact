import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error when version is not one of the allowed values', () => {
    const version = '2';
    const expectedError = 'Path specification language version must be one of "1", "1.0", or "1.1"';
    try {
      new Matcher('/foo', version);
    } catch (error) {
      expect(error.message).toBe(expectedError);
    }
  });
});