import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher constructor default version parameter', () => {
  it('should use version 1.1 as default when no version is specified', () => {
    const matcher = Matcher.for('/**/bar');
    expect(matcher.spec).toBe('/**/bar');
    expect(matcher.source).toBe('^(?:/[^/]+)*/bar$');
  });
});