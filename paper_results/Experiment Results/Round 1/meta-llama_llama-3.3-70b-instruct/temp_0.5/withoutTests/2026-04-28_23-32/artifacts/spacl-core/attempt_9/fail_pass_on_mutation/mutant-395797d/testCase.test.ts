import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a non-empty message when the path starts with a slash', () => {
    try {
      new Matcher('/');
    } catch (e: any) {
      expect(e.message).toEqual('Path contains empty segments');
    }
  });
});