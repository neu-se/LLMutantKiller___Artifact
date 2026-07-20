import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a non-empty message when the path starts with a slash', () => {
    let error: any;
    try {
      new Matcher('/');
    } catch (e: any) {
      error = e;
    }
    expect(error.message).toEqual('Path contains empty segments');
  });
});