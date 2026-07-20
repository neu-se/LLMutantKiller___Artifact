import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should not throw an error when version is undefined', () => {
    const spec = '/';
    const version: '1' | '1.0' | '1.1' | undefined = undefined;
    expect(() => Matcher.for(spec, version)).not.toThrow();
  });
});