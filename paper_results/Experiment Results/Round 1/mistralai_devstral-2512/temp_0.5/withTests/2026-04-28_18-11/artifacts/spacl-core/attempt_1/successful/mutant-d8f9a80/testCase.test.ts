import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it, expect } from '@jest/globals';

describe('Matcher constructor validation', () => {
  it('should throw an error with message "Path must begin with a slash" when path does not start with a slash', () => {
    expect(() => {
      new Matcher('invalidPath');
    }).toThrow('Path must begin with a slash');
  });
});