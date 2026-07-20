import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() error message', () => {
  it('throws correct error message for non-document', () => {
    const a = new Delta().insert('Test');
    const b = new Delta().delete(4);
    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called on non-document'));
  });
});