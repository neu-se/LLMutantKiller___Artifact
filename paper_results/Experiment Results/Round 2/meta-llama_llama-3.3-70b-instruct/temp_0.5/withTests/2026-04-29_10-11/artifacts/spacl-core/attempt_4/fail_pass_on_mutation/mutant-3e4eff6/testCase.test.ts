import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('matches paths correctly', () => {
    const matcher = Matcher.for('/foo/+/*');
    strictEqual(!!matcher[Symbol.match]('/foo/abc/def'), true);
    strictEqual(!!matcher[Symbol.match]('/foo/abc'), false);
    strictEqual(!!matcher[Symbol.match]('/foo/'), false);
    strictEqual(!!matcher[Symbol.match]('/foo'), false);
    strictEqual(!!matcher[Symbol.match]('/foo/abc/def/ghi'), true);
  });
});