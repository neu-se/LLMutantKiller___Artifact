import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should create a new Matcher with default version', () => {
    // @ts-ignore
    expect(() => Matcher.for('/', "")).toThrowError();
  });
});