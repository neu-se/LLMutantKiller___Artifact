import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('matches paths correctly', () => {
    const matcher = Matcher.for('/foo/++/bar');
    strictEqual(!!matcher[Symbol.match]('/foo/bar'), true);
    strictEqual(!!matcher[Symbol.match]('/foo/boo/bar'), true);
    strictEqual(!!matcher[Symbol.match]('/foo/'), false);
    strictEqual(!!matcher[Symbol.match]('/foo'), false);
    strictEqual(!!matcher[Symbol.match]('/foo/bar/boo'), false);
    strictEqual(!!matcher[Symbol.match]('/foo/boo/boo/bar'), false);
  });
});