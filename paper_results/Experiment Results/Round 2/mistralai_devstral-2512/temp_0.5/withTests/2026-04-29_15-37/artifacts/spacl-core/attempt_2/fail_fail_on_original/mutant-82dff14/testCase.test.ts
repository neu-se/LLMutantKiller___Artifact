import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher constructor version parameter', () => {
  it('should throw an error when version is an empty string', () => {
    expect(() => {
      new Matcher('/test', '');
    }).toThrow('Path contains malformed wildcards');
  });
});