import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher constructor', () => {
  it('should throw an error when version is not a valid string', () => {
    const validVersions = ['1', '1.0', '1.1'];
    for (const version of validVersions) {
      expect(() => new Matcher('/', version)).not.toThrowError();
    }
    const invalidVersions = ['2', '1.2', 'a'];
    for (const version of invalidVersions) {
      expect(() => new (Matcher as any)('/', version)).toThrowError();
    }
  });
});