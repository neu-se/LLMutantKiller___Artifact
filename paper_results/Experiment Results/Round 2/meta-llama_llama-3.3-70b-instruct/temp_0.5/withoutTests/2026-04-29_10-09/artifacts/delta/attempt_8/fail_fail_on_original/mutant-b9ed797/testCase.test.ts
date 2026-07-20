import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the push operation when index equals ops length and newOp is inserted at the correct position', () => {
    const delta = new Delta();
    delta.ops = [{ insert: 'Hello' }];
    const newOp = { insert: ' World' };
    delta.ops.push = jest.fn(delta.ops.push);
    delta.push(newOp);
    expect(delta.ops.push).toHaveBeenCalledTimes(1);
  });
});