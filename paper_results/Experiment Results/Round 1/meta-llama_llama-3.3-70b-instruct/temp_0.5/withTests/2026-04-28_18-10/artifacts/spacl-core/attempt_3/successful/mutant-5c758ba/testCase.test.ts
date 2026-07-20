import { describe, it } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('detects mutation in path validation', () => {
    const validPath = '/foo';
    const invalidPath = '/foo/';
    expect(() => new Matcher(validPath)).not.toThrow();
    expect(() => new Matcher(invalidPath)).toThrow();
    try {
      new Matcher(invalidPath);
    } catch (e) {
      expect(e.message).toBe('Path must not end with a slash');
    }
  });
});