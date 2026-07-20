import Delta from "../../src/Delta";

describe('diff() error message for non-document', () => {
  it('throws with correct message when "this" delta is non-document', () => {
    const a = new Delta().delete(4);
    const b = new Delta().insert('Test');
    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});