import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should reject path spec with invalid capture segments', () => {
    const spec = '/:a';
    expect(() => Matcher.for(spec)).not.toThrow();
    const spec2 = '/:1a';
    expect(() => Matcher.for(spec2)).not.toThrow();
  });
});