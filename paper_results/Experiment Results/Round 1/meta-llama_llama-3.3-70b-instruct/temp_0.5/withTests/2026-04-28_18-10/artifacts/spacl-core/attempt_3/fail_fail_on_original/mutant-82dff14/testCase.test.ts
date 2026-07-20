import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error when version is an empty string', () => {
    expect(() => new Matcher('/foo', '')).toThrowError('Path specification language version must be one of "1", "1.0", or "1.1"');
  });
});