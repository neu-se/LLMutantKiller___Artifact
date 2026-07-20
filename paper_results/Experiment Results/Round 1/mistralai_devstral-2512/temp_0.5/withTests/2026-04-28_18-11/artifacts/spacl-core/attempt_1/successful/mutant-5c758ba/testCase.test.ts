import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it, expect } from '@jest/globals';

describe('Matcher path validation', () => {
  it('should reject paths ending with a slash', () => {
    expect(() => {
      Matcher.for('/foo/');
    }).toThrow('Path must not end with a slash');
  });
});