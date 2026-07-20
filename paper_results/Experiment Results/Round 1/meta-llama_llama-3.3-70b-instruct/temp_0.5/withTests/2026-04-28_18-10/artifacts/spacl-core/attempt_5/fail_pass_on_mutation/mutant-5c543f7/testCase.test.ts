import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should match paths with capture segments correctly', () => {
    const matcher = Matcher.for('/:a');
    const match = matcher.exec('/ab');
    strictEqual(match !== null, true);
    strictEqual(match[1], 'ab');
  });
});