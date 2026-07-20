import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should match paths with capture segments correctly', () => {
    const matcher = Matcher.for('/:a');
    const match = matcher.exec('/a');
    strictEqual(match !== null, true);
    strictEqual(match[1], 'a');
    const matcher2 = Matcher.for('/:ab');
    const match2 = matcher2.exec('/a');
    strictEqual(match2 === null, true);
  });
});