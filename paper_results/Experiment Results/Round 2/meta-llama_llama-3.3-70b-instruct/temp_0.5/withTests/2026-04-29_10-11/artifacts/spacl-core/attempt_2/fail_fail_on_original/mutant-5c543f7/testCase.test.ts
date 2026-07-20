import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should compile path spec with capture segments correctly', () => {
    const spec = '/:a:b';
    const matcher = Matcher.for(spec);
    strictEqual(matcher.props.length, 1);
  });
});