import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('matches paths correctly', () => {
    const matcher = Matcher.for('/foo/++/bar');
    strictEqual(matcher.match('/foo/bar').length, 1);
    strictEqual(matcher.match('/foo/boo/bar').length, 1);
    strictEqual(matcher.match('/foo/boo/boo/bar').length, 1);
    strictEqual(matcher.match('/foo/').length, null);
    strictEqual(matcher.match('/foo').length, null);
    strictEqual(matcher.match('/foo/bar/boo').length, null);
  });
});