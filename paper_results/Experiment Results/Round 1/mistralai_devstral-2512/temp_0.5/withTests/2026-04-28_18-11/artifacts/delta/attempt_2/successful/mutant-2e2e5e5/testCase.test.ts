import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() error message', () => {
  it('should throw error with correct message when called with non-document', () => {
    const a = new Delta().insert('Test');
    const b = new Delta().retain(1).insert('B');
    expect(() => {
      b.diff(a);
    }).toThrow('diff() called with non-document');
  });
});