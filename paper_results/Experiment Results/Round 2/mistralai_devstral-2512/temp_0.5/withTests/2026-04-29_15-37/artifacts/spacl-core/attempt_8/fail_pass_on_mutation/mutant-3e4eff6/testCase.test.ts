import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher mutation test', () => {
  it('should correctly handle empty optional segments with min=0', () => {
    const matcher = Matcher.for('/++');
    expect('/').toMatch(matcher);
    expect('/foo').toMatch(matcher);
    expect('/foo/').not.toMatch(matcher);
    expect('/foo/bar').not.toMatch(matcher);
  });
});