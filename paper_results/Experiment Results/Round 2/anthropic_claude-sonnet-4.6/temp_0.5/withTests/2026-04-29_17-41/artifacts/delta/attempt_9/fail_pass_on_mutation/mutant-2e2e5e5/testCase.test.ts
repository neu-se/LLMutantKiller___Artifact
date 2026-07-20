import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('throws error with exact message "diff() called with non-document" when this delta is non-document', () => {
    const a = new Delta().retain(1);
    const b = new Delta().insert('Test');
    let caughtError: Error | null = null;
    try {
      a.diff(b);
    } catch (e) {
      caughtError = e as Error;
    }
    expect(caughtError).not.toBeNull();
    expect(caughtError!.message).toBe('diff() called with non-document');
  });
});