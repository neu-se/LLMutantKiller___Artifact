import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher mutation test', () => {
  it('should correctly handle optional segments with min=0 in version 1.1', () => {
    const matcher = Matcher.for('/**', '1.1');
    expect('/').toMatch(matcher);
    expect('/foo').toMatch(matcher);
    expect('/foo/bar').toMatch(matcher);
    expect('/foo/bar/baz').toMatch(matcher);
    expect('/foo/').not.toMatch(matcher);
  });
});