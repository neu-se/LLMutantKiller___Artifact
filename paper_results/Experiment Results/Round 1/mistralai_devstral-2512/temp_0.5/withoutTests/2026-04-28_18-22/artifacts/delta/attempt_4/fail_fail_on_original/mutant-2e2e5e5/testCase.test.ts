import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should throw an error with the correct preposition when diff is called with non-document deltas', () => {
    const delta1 = new Delta([{ insert: 'test' }]);
    const delta2 = new Delta([{ delete: 1 }]);

    try {
      delta1.diff(delta2);
      fail('Expected an error to be thrown');
    } catch (error: any) {
      expect(error.message).toBe('diff() called with non-document');
    }
  });
});