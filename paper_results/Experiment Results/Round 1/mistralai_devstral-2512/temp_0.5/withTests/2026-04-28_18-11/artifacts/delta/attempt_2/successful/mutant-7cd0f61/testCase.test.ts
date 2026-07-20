import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() error message', () => {
  it('should throw correct error message when called with non-document', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    expect(() => {
      b.diff(a);
    }).toThrow('diff() called with non-document');
  });
});