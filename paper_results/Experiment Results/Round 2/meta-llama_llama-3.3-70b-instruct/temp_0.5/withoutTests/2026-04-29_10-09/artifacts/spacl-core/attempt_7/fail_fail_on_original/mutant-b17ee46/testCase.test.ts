import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when version is an empty string on the mutated code', () => {
    // This test case checks if the version is being checked correctly
    // If the version is not checked correctly, it should not throw an error
    expect(() => {
      const matcher = new Matcher('/', '');
    }).toThrowError();
  });
});