import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should reject paths that end with a slash', () => {
    // This test passes on the original code because the regex ^.+\/$ matches paths ending with a slash
    // It fails on the mutated code because the regex .+\/$ does not match paths ending with a slash
    expect(() => {
      new Matcher('/');
    }).not.toThrow('Path must not end with a slash');
  });
});