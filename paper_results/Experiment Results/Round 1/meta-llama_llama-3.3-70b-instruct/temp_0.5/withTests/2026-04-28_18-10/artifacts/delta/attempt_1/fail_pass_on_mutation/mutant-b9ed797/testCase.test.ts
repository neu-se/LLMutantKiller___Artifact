import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('push operation', () => {
    const delta = new Delta();
    const newOp: Delta['Op'] = { insert: 'test' };
    delta.push(newOp);
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual(newOp);
  });
});