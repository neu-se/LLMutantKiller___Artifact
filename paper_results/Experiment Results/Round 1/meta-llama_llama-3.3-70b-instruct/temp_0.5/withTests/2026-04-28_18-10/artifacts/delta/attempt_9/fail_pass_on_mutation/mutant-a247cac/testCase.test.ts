import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should correctly compose two deltas and check last op index', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const composed = a.compose(b);
    const lastOpIndex = composed.ops.length - 1;
    expect(composed.ops[lastOpIndex]).toEqual({ insert: 'A' });
    expect(() => {
      const nextOp = composed.ops[lastOpIndex + 1];
      if (nextOp) {
        throw new Error('Unexpected op at index ' + (lastOpIndex + 1));
      }
    }).not.toThrow();
  });
});