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
    const result2 = matcher[Symbol.match]('/foo/');
    strictEqual(result1 !== null && result2 === null, true);
  });
});