import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly invert a delta with retain and attributes', () => {
    const base = new Delta();
    base.retain(1, { foo: 'bar' });
    const delta = new Delta();
    delta.retain(1, { foo: 'baz' });
    const inverted = delta.invert(base);
    expect(inverted.ops.length).toBe(1);
    expect(inverted.ops[0].retain).toBe(1);
    expect(inverted.ops[0].attributes).toEqual({ foo: null });
    expect(Object.keys(inverted.ops[0].attributes)).toHaveLength(1);
  });
});