import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it, expect } from '@jest/globals';

describe('Matcher trailing slash behavior', () => {
  it('should return null when matching a path with trailing slash for wildcard patterns', () => {
    const matcher = Matcher.for('/*');
    const result = '/test/'.match(matcher);
    expect(result).toBeNull();
  });
});