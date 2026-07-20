import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('error message says "with" when this delta is non-document, not "on"', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');

    let errorMessage = '';
    try {
      b.diff(a);
    } catch (e) {
      errorMessage = (e as Error).message;
    }

    expect(errorMessage).toBe('diff() called with non-document');
  });
});