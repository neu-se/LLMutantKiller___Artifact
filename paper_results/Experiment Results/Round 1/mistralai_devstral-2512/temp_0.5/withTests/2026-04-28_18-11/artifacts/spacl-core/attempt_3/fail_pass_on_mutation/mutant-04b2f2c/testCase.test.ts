import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it, expect } from '@jest/globals';

describe('Matcher trailing slash behavior', () => {
  it('should return null when matching a path with trailing slash and length > 1', () => {
    const matcher = Matcher.for('/foo/bar');
    const result = '/foo/bar/'.match(matcher);
    expect(result).toBeNull();
  });
});