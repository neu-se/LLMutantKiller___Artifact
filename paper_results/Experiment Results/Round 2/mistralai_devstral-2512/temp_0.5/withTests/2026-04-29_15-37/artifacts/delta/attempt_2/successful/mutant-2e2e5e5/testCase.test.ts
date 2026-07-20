import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('diff() error message', () => {
  it('throws correct error message when comparing non-document with document', () => {
    const a = new Delta().retain(1).insert('B');
    const b = new Delta().insert('A');
    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});