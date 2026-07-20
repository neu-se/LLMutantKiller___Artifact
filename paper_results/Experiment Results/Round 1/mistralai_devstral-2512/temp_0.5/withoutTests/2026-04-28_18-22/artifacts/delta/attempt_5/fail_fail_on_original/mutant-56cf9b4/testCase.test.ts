import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert with retain and attributes', () => {
  it('should correctly invert a delta with retain and attributes', () => {
    const base = new Delta().insert('Hello', { bold: true });
    const delta = new Delta().retain(5, { italic: true });
    const inverted = delta.invert(base);

    expect(inverted.ops).toEqual([{ retain: 5, attributes: { bold: true, italic: null } }]);
  });
});