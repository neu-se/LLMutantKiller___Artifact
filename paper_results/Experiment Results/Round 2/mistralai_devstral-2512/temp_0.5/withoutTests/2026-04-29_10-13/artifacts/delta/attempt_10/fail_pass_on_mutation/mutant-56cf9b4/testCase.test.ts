import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta invert', () => {
  it('should handle retain operations with attributes correctly', () => {
    const base = new Delta().insert('test');
    const delta = new Delta().retain(2, { color: 'red' });
    const inverted = delta.invert(base);
    expect(inverted.ops).toEqual([{ retain: 2, attributes: { color: null } }]);
  });
});