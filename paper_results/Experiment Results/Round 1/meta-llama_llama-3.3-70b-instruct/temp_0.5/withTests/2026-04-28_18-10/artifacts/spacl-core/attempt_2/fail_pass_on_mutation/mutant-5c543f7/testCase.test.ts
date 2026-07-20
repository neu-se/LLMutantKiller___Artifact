import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should correctly match paths with capture segments', () => {
    const matcher = Matcher.for('/:a');
    const match = matcher.exec('/b');
    strictEqual(match !== null, true);
    strictEqual(match[1], 'b');
  });
});