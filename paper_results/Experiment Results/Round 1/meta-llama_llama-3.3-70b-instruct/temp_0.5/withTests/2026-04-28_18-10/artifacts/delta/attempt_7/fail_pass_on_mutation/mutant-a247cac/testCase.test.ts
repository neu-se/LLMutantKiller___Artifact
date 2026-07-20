import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should correctly compose two deltas and check last op', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const composed = a.compose(b);
    expect(composed.ops[composed.ops.length - 1]).toEqual({ insert: 'A' });
    expect(() => composed.ops[composed.ops.length]).not.toThrow();
  });
});