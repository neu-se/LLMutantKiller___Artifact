import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a specific message when the path is empty', () => {
    try {
      new Matcher('');
    } catch (e: any) {
      expect(e.message).toEqual('Path contains invalid characters');
    }
  });
});