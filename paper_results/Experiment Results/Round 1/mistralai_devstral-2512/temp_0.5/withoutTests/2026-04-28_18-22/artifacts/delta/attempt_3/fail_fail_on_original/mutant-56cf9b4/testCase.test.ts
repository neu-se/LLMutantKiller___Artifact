import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert with retain and attributes', () => {
  it('should correctly handle retain with attributes during inversion', () => {
    const base = new Delta().insert('test', { color: 'red' });
    const delta = new Delta().retain(4, { bold: true });
    const inverted = delta.invert(base);

    const expected = new Delta().retain(4, { color: 'red', bold: null });
    expect(inverted.ops).toEqual(expected.ops);
  });
});