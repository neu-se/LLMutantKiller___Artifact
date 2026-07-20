import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should match paths correctly', () => {
    const matcher = new Matcher('/foo');
    const string = '/foo/';
    if (string.length > 1 && string.endsWith('/')) {
      strictEqual(matcher[Symbol.match](string), null);
    } else {
      strictEqual(matcher[Symbol.match](string) !== null, true);
    }
  });
});