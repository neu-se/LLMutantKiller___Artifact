import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher mutation test', () => {
  it('should correctly handle optional segments with min=0 in complex nested patterns', () => {
    const matcher = Matcher.for('/++/++/++');
    expect('/').toMatch(matcher);
    expect('/foo').toMatch(matcher);
    expect('/foo/bar').toMatch(matcher);
    expect('/foo/bar/baz').not.toMatch(matcher);
    expect('/foo/bar/baz/qux').not.toMatch(matcher);
  });
});