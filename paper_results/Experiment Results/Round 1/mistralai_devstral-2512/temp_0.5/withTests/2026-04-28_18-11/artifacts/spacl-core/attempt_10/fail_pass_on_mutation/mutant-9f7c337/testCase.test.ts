import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard validation', () => {
  it('should reject paths with malformed wildcards like "/+/"', () => {
    expect(() => {
      Matcher.for('/+*');
    }).toThrow('Path contains malformed wildcards');
  });
});