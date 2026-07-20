import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher constructor version parameter', () => {
  it('should accept match-many-or-none wildcards when using default version', () => {
    const matcher = Matcher.for('/**');
    expect(matcher.spec).toBe('/**');
    expect('/foo/bar/baz'.match(matcher)).not.toBeNull();
  });
});