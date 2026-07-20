import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should throw an error with a specific message when path contains empty segments', () => {
    expect(() => {
      new Matcher('/a//b');
    }).toThrow('Path contains empty segments');
  });
});