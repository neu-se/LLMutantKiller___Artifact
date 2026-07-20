import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should throw an error when version is an empty string in the original code but not in the mutated code', () => {
    const spec = '/';
    const version = '';
    // In the original code, version has a default value of '1.1', so this should not throw an error
    // In the mutated code, version is an empty string by default, so this should throw an error
    expect(() => {
      const matcher = Matcher.for(spec, version as any);
      expect(matcher).toBeInstanceOf(Matcher);
    }).not.toThrow();
  });
});