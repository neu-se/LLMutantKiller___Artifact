import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard validation', () => {
  it('should reject malformed wildcards with * followed by /', () => {
    expect(() => {
      Matcher.for('/a*/');
    }).toThrow('Path contains malformed wildcards');
  });
});