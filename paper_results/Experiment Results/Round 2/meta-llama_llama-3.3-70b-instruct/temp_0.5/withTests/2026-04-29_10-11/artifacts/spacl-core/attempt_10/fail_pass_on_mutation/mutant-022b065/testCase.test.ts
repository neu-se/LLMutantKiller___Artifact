import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('matcher', () => {
  it('should correctly validate a path that does not end with a slash', () => {
    const spec = '/foo';
    const matcher = new Matcher(spec);
    strictEqual(matcher.spec, spec);
  });
});