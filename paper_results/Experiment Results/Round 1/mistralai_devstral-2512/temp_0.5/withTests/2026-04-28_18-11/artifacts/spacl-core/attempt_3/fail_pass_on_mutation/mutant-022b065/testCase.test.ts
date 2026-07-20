import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should accept root path "/"', () => {
    expect(() => {
      new Matcher('/');
    }).not.toThrow();
  });
});