import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher trailing slash validation', () => {
  it('should reject paths with trailing slash after root', () => {
    // The mutation changes the regex from /^.+\/$/ to /.+\/$/
    // The original requires at least one character before the trailing slash
    // The mutated version would allow empty strings followed by slash

    // This test case should fail on the mutated code because
    // the mutated regex /.+\/$/ would match "//" (empty segment + slash)
    // while the original /^.+\/$/ would not
    expect(() => {
      new Matcher('//');
    }).toThrow('Path must not end with a slash');
  });
});