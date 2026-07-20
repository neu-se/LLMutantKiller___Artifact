import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw a TypeScript error when version is an empty string', () => {
    // @ts-expect-error
    expect(() => new Matcher('/path', '')).toThrowError();
  });
});