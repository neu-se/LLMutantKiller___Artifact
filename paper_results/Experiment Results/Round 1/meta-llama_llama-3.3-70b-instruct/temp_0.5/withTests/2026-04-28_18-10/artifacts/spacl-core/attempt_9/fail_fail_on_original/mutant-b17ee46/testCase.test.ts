import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should throw an error when version is not provided and has no default value', () => {
    const spec = '/';
    // In the original code, version has a default value of '1.1', so this should not throw an error
    // In the mutated code, version has no default value, so this should throw an error
    expect(() => {
      (Matcher as any).for(spec);
    }).toThrow();
  });
});