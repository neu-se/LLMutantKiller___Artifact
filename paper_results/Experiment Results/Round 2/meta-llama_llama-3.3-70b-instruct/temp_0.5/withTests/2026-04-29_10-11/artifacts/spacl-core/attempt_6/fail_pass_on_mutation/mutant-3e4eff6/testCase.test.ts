import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('matches paths correctly', () => {
    const matcher = Matcher.for('/foo/+');
    strictEqual(!!matcher[Symbol.match]('/foo/abc'), true);
    strictEqual(!!matcher[Symbol.match]('/foo/'), false);
    strictEqual(!!matcher[Symbol.match]('/foo'), false);
    strictEqual(!!matcher[Symbol.match]('/foo/abc/def'), false);
    const result1 = matcher[Symbol.match]('/foo/abc');
    strictEqual(result1 !== null && result1.length === 1, true);
  });
});