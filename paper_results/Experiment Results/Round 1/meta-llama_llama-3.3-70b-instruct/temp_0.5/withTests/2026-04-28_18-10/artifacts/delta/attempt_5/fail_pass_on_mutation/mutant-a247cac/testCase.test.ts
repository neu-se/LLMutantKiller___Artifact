import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta compose', () => {
  it('should correctly compose two deltas and handle last op optimization', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const composed = a.compose(b);
    const expected = new Delta().insert('A');
    expect(composed).toEqual(expected);
    expect(composed.ops.length).toBe(1);
    expect(composed.ops[composed.ops.length - 1]).toEqual({ insert: 'A' });
  });
});