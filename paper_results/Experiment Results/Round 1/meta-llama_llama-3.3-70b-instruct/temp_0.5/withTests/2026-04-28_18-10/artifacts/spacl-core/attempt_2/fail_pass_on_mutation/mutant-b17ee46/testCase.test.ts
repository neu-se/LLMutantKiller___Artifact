import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should create a new matcher with default version', () => {
    const spec = '/';
    const matcher = Matcher.for(spec);
    strictEqual(matcher.spec, spec);
  });
});