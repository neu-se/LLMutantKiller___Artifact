import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher version parameter default', () => {
  it('should use version 1.1 when version is not specified', () => {
    const matcher = Matcher.for('/:param');
    expect(matcher.props).toEqual(['param']);
  });
});