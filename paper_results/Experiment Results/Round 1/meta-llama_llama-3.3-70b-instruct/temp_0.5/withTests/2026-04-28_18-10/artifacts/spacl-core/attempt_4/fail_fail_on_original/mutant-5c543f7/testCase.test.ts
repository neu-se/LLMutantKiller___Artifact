import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should match paths with capture segments correctly', () => {
    const matcher = Matcher.for('/:ab');
    const match = matcher.exec('/a');
    strictEqual(match === null, true);
  });
});