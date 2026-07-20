import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() with delete operation', () => {
  it('should correctly invert a delete operation when followed by retain with attributes', () => {
    const delta = new Delta().delete(1).retain(2, { bold: true });
    const base = new Delta().insert('123456');
    const expected = new Delta().insert('1').retain(2, { bold: null });
    const inverted = delta.invert(base);
    expect(inverted.ops.length).toBeGreaterThan(0);
    expect(inverted.ops[0]).toHaveProperty('insert', '1');
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});