import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('push()', () => {
  it('should add a new operation to the delta when the index is equal to the length of the ops array', () => {
    const delta = new Delta();
    const newOp = { insert: 'test' };
    delta.ops = [{ insert: 'initial' }];
    delta.push(newOp);
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0]).toEqual({ insert: 'initial' });
    expect(delta.ops[1]).toEqual(newOp);
  });
});