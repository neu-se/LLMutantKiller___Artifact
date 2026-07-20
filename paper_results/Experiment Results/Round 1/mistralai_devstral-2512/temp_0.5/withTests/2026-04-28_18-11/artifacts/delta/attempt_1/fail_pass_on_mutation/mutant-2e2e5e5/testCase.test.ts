import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() error message', () => {
  it('should throw error with correct message when called on non-document', () => {
    const a = new Delta().insert('Test');
    const b = new Delta().delete(4);
    expect(() => {
      a.diff(b);
    }).toThrow('diff() called on non-document');
  });
});