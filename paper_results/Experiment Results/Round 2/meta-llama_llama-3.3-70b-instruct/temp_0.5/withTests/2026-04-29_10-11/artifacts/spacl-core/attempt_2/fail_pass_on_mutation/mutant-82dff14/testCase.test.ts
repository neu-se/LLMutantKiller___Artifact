import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher constructor', () => {
  it('should not throw an error when version is provided', () => {
    expect(() => new Matcher('/', '1.1')).not.toThrowError();
  });
});