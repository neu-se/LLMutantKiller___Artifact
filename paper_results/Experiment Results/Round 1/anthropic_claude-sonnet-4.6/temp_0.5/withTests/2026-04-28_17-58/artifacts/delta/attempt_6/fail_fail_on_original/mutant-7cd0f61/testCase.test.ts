import Delta from "../../../../../../../../../../../src/Delta";

describe('diff()', () => {
  it('should throw "diff() called with non-document" when this delta is a non-document', () => {
    const a = new Delta().retain(1).insert('B');
    const b = new Delta().insert('A');

    expect(() => {
      a.diff(b);
    }).toThrow(new Error('diff() called with non-document'));
  });
});