import { describe, it } from '@jest/globals';
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should throw an error for malformed wildcards', () => {
    expect(() => new Matcher('/+*')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/*+')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/+**')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/*++')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/+++')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/***')).toThrowError('Path contains malformed wildcards');
  });
});