import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher constructor version parameter', () => {
  it('should use version 1.1 as default when no version is specified', () => {
    const matcher = Matcher.for('/**/test');
    expect(matcher.spec).toBe('/**/test');
    expect('/foo/bar/test'.match(matcher)).not.toBeNull();
  });
});