import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard validation', () => {
  it('should accept valid paths with non-wildcard characters before +', () => {
    expect(() => {
      Matcher.for('/a+');
    }).not.toThrow();
  });
});