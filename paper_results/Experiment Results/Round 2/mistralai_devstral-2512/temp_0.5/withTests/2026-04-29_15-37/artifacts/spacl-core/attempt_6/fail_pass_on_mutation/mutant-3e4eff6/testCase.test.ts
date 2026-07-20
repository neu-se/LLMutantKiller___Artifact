import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher mutation test', () => {
  it('should correctly handle optional segments with min=0 when followed by required segments', () => {
    const matcher = Matcher.for('/++/bar/+/boo');
    expect('/bar/foo/boo').toMatch(matcher);
    expect('/foo/bar/foo/boo').toMatch(matcher);
    expect('/bar/boo').not.toMatch(matcher);
    expect('/foo/bar/boo').not.toMatch(matcher);
    expect('/bar/foo/boo/baz').not.toMatch(matcher);
  });
});