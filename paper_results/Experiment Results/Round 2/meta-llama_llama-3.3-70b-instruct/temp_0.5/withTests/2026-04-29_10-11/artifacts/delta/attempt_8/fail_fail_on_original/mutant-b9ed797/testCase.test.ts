import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('push()', () => {
  it('should add a new operation to the delta', () => {
    const delta = new Delta();
    const newOp1 = { insert: 'test1' };
    const newOp2 = { insert: 'test2' };
    delta.push(newOp1);
    delta.push(newOp2);
    expect(delta.ops.length).toBeGreaterThan(1);
    expect(delta.ops[0]).toEqual(newOp1);
    expect(delta.ops[1]).toEqual(newOp2);
  });
});