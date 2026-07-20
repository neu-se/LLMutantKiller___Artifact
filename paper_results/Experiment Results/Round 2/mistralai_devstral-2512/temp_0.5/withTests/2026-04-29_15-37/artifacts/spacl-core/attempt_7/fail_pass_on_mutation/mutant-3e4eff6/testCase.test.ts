import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher mutation test', () => {
  it('should correctly handle optional segments with min=0 in wildcard patterns', () => {
    const matcher = Matcher.for('/**/bar');
    expect('/bar').toMatch(matcher);
    expect('/foo/bar').toMatch(matcher);
    expect('/foo/baz/bar').toMatch(matcher);
    expect('/bar/foo').not.toMatch(matcher);
    expect('/foo/bar/baz').not.toMatch(matcher);
  });
});