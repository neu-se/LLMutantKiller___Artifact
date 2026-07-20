import Delta from "../../src/Delta";

describe('diff() error message', () => {
  it('should throw with "with non-document" when this delta contains a non-document op', () => {
    const a = new Delta().delete(4);
    const b = new Delta().insert('Test');
    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});