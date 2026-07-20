import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should reject paths that end with a slash', () => {
    expect(() => {
      new Matcher('/foo/');
    }).toThrow('Path must not end with a slash');
  });
});