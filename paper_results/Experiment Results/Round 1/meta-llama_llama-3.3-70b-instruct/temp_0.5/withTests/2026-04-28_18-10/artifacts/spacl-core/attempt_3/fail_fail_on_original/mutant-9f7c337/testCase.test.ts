import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('rejects paths with malformed wildcards', () => {
    const spec = '/[*+]';
    expect(() => Matcher.for(spec)).toThrowError('Path contains malformed wildcards');
  });
});