import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when an empty string is passed as the version to the static for method', () => {
    expect(() => Matcher.for('/', "")).toThrowError();
  });
});