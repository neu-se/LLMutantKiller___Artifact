import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher constructor', () => {
  it('should throw an error when version is not one of the allowed values', () => {
    expect(() => new Matcher('/', '1')).not.toThrowError();
    expect(() => new Matcher('/', '1.0')).not.toThrowError();
    expect(() => new Matcher('/', '1.1')).not.toThrowError();
    expect(() => new Matcher('/', '2')).toThrowError();
  });
});