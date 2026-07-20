import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should throw an error when version is an empty string', () => {
    const spec = '/';
    const version = '';
    expect(() => Matcher.for(spec, version)).toThrowError('Path specification language version must be one of "1", "1.0", or "1.1"');
  });
});