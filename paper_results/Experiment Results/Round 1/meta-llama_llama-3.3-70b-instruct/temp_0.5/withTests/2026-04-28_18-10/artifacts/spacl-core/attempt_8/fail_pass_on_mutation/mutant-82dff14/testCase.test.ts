import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should not throw an error when version is an empty string', () => {
    // @ts-ignore
    expect(() => new Matcher('/foo', '')).not.toThrowError();
  });
});