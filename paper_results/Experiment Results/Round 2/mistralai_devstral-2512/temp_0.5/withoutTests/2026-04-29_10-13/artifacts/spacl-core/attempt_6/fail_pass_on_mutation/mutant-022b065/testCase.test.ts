import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should accept a valid path that starts and ends with alphanumeric characters', () => {
    expect(() => {
      new Matcher('/abc123');
    }).not.toThrow();
  });
});