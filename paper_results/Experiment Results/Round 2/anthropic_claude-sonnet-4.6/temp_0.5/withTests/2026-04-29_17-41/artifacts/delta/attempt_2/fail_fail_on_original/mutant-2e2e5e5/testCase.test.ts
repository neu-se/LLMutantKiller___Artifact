import Delta from "../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() non-document error message', () => {
  it('throws error with "with" when this delta contains a non-insert op', () => {
    const a = new Delta().delete(4);
    const b = new Delta().insert('Test');
    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});