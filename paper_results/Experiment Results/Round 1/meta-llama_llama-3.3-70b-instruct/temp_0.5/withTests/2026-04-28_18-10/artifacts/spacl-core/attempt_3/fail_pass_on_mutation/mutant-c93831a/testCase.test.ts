import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should match paths correctly', () => {
    const matcher = new Matcher('/foo');
    const string = '/foo/';
    const originalResult = string.match(new RegExp(matcher.source));
    const result = matcher[Symbol.match](string);
    strictEqual(result !== null, originalResult !== null);
  });
});