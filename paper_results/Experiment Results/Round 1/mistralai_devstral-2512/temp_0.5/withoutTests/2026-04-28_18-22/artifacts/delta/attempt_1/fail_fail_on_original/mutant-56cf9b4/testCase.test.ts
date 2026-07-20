import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta invert with retain and attributes', () => {
  it('should correctly invert a delta with retain and attributes', () => {
    const base = new Delta().insert('Hello', { bold: true });
    const delta = new Delta().retain(5, { italic: true });
    const inverted = delta.invert(base);

    const expected = new Delta().retain(5, { bold: true, italic: null });
    expect(inverted.ops).toEqual(expected.ops);
  });
});