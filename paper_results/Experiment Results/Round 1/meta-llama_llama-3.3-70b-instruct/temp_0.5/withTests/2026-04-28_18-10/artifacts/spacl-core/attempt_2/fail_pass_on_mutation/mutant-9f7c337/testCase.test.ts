import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('accepts valid paths', () => {
    const spec = '/foo/*';
    const matcher = Matcher.for(spec);
    strictEqual(matcher.spec, spec);
  });
});