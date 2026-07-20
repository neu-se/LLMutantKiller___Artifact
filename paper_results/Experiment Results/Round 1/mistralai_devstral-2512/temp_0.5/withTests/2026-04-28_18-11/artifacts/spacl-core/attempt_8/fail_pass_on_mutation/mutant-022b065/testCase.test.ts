import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should accept root path but reject when it ends with slash', () => {
    // This test passes on original code because ^.+\/$ requires at least one character before the slash
    // It fails on mutated code because .+\/$ matches empty strings before the slash, causing rejection
    expect(() => {
      new Matcher('/');
    }).not.toThrow();
    expect(() => {
      new Matcher('/test/');
    }).toThrow('Path must not end with a slash');
  });
});