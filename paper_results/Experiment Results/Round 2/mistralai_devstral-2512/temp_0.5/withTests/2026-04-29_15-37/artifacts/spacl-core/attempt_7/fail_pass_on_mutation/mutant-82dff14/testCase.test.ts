import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher constructor version parameter', () => {
  it('should reject match-many-or-none wildcards when using version 1.0', () => {
    expect(() => {
      new Matcher('/**', '1.0');
    }).toThrow('Path contains malformed wildcards');
  });
});