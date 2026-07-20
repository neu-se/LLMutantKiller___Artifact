import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard validation', () => {
  it('should accept paths with wildcards at the start of a segment', () => {
    expect(() => {
      Matcher.for('/*a');
    }).not.toThrow();
  });
});