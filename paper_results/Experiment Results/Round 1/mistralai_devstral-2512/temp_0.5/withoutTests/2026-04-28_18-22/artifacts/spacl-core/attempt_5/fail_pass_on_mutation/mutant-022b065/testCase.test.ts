import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor', () => {
  it('should throw an error for empty path after slash', () => {
    expect(() => {
      new Matcher('//');
    }).toThrow('Path contains empty segments');
  });
});