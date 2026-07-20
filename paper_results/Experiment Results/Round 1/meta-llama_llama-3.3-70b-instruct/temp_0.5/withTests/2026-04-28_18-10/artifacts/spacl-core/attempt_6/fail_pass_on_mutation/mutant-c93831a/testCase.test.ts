import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should match paths correctly', () => {
    const matcher = new Matcher('/foo');
    const string = '/foo/';
    const originalResult = new RegExp(matcher.source).exec(string);
    const result = matcher[Symbol.match](string);
    strictEqual(originalResult !== null, result !== null);
  });
});