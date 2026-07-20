import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it, expect } from '@jest/globals';

describe('Matcher path validation', () => {
  it('should throw an error with message "Path must not end with a slash" when path ends with a slash', () => {
    expect(() => {
      new Matcher('/foo/');
    }).toThrow('Path must not end with a slash');
  });
});