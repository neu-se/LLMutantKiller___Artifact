import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error when version is not provided', () => {
    // @ts-ignore
    expect(() => Matcher.for('/', "")).not.toThrowError();
  });
});