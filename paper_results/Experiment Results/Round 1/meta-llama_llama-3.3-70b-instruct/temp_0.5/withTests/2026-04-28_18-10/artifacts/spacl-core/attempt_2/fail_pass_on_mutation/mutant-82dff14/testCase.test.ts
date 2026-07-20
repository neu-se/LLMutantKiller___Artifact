import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should not throw an error when version is provided', () => {
    expect(() => new Matcher('/foo', '1.1')).not.toThrowError();
    expect(() => new Matcher('/foo', '1')).not.toThrowError();
    expect(() => new Matcher('/foo', '1.0')).not.toThrowError();
  });
});