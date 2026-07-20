import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert', () => {
  it('should correctly invert a retain operation with attributes', () => {
    const base = new Delta().insert('Hello World');
    const delta = new Delta().retain(5, { bold: true });
    const inverted = delta.invert(base);
    const expected = new Delta().retain(5, { bold: null });
    expect(inverted.ops).toEqual(expected.ops);
  });
});