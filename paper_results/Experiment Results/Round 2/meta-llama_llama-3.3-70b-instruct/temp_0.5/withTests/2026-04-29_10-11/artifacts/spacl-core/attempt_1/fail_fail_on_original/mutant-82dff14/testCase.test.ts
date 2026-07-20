import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher constructor', () => {
  it('should throw an error when version is not provided', () => {
    expect(() => new Matcher('/', '')).toThrowError('version must be one of "1", "1.0", or "1.1"');
  });
});