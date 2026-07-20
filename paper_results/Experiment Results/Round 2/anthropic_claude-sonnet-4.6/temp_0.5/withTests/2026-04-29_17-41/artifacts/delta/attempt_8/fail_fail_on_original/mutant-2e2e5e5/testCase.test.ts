import Delta from "../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('throws exact error message with "with" when this delta has a retain op', () => {
    const a = new Delta().retain(1);
    const b = new Delta().insert('Test');
    let errorMessage = '';
    try {
      a.diff(b);
    } catch (e) {
      errorMessage = (e as Error).message;
    }
    expect(errorMessage).toBe('diff() called with non-document');
  });
});