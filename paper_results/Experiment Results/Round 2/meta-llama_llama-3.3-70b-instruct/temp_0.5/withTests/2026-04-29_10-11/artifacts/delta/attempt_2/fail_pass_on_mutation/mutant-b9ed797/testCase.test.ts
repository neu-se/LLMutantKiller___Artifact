import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('push()', () => {
  it('should add a new operation to the delta', () => {
    const delta = new Delta();
    const newOp = { insert: 'test' };
    delta.push(newOp);
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual(newOp);
  });
});