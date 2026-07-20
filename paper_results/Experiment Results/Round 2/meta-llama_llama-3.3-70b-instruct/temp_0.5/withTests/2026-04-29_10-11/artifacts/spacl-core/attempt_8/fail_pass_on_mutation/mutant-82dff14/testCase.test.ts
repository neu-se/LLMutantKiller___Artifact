import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher constructor', () => {
  it('should throw an error when version is an empty string', () => {
    const matcher = new (Matcher as any)('/', '1.1');
    expect(matcher).toBeInstanceOf(Matcher);
    expect(() => {
      const code = 'new Matcher("/", "")';
      eval(code);
    }).toThrowError();
  });
});