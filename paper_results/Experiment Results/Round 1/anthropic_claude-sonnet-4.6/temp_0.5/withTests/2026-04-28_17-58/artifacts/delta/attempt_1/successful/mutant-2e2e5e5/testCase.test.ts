import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('diff() error message for non-document', () => {
  it('should throw with "with" in the error message when this delta is a non-document', () => {
    const a = new Delta().retain(1).insert('B');
    const b = new Delta().insert('A');
    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});