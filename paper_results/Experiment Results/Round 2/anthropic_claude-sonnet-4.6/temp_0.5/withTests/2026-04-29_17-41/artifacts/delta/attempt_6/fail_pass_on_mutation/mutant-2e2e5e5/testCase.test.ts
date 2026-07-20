import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff()', () => {
  it('throws error message "diff() called with non-document" when this delta has retain op', () => {
    const a = new Delta().retain(1);
    const b = new Delta().insert('Test');
    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});