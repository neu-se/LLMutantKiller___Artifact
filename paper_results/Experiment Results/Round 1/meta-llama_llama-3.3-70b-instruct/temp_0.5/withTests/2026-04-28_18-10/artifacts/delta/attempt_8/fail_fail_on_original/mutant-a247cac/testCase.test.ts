import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should correctly compose two deltas and check last op index', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const composed = a.compose(b);
    expect(composed.ops.length).toBe(1);
    expect(composed.ops[composed.ops.length - 1]).toEqual({ insert: 'A' });
    expect(() => {
      const lastOp = composed.ops[composed.ops.length];
      if (lastOp) {
        expect(lastOp).toBeUndefined();
      }
    }).toThrow();
  });
});