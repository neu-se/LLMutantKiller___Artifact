import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('push()', () => {
  it('should add a new operation to the delta', () => {
    const delta = new Delta();
    const newOp = { insert: 'test' };
    delta.push(newOp);
    delta.push(newOp);
    expect(delta.ops).not.toEqual([newOp]);
  });
});