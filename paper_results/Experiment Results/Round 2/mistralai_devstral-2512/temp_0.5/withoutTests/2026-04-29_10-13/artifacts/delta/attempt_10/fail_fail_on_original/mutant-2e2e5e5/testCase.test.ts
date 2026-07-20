import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta diff method', () => {
  it('should throw an error with "with" when comparing different delta instances', () => {
    const delta1 = new Delta([{ insert: 'test' }]);
    const delta2 = new Delta([{ delete: 1 }]);

    let errorMessage = '';
    try {
      delta1.diff(delta2);
    } catch (error: unknown) {
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    }

    // The original code should throw "diff() called with non-document"
    // The mutated code will throw "diff() called non-document" (missing preposition)
    expect(errorMessage).toContain('with');
  });
});