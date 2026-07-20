import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('should correctly handle retain operations with attributes', () => {
    const base = new Delta().insert('test');
    const delta = new Delta().retain(2, { bold: true });
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([{ retain: 2, attributes: { bold: null } }]);
  });
});