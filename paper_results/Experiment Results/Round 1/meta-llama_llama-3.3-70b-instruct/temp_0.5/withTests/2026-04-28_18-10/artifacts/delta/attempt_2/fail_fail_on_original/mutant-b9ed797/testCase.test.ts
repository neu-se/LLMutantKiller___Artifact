import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('push operation with index', () => {
    const delta = new Delta();
    const newOp: Delta['Op'] = { insert: 'test' };
    delta.ops = [{ insert: 'old' }];
    delta.push(newOp);
    expect(delta.ops.length).toEqual(2);
    expect(delta.ops[0]).toEqual({ insert: 'old' });
    expect(delta.ops[1]).toEqual(newOp);
  });
});