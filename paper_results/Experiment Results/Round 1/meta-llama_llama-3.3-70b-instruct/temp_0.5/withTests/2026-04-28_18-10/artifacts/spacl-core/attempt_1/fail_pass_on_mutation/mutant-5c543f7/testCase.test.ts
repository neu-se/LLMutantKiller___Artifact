import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should reject paths with malformed captures', () => {
    const spec = '/:a:';
    expect(() => Matcher.for(spec)).toThrowError('Path contains malformed captures');
  });
});