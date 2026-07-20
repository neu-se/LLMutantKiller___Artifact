import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should reject path spec with single character capture segments correctly', () => {
    const spec = '/:a';
    const matcher = Matcher.for(spec);
    const spec2 = '/:a';
    expect(() => Matcher.for(spec2)).not.toThrow();
    const spec3 = '/:';
    expect(() => Matcher.for(spec3)).toThrowError('Path contains malformed captures');
  });
});