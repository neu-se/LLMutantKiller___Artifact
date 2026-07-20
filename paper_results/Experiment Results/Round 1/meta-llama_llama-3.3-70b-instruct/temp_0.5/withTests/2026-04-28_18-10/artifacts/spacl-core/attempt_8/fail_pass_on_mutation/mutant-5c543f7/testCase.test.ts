import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should match paths with capture segments correctly', () => {
    const matcher = Matcher.for('/:a');
    const match1 = matcher.exec('/a');
    const match2 = matcher.exec('/ab');
    strictEqual(match1 !== null, true);
    strictEqual(match2 !== null, true);
    strictEqual(match1[1], 'a');
    strictEqual(match2[1], 'ab');
  });
});