import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should throw an error when version is not one of the allowed values', () => {
    const spec = '/';
    const version = '2.0';
    expect(() => Matcher.for(spec, version as any)).toThrowError('Path specification language version must be one of "1", "1.0", or "1.1"');
  });
});