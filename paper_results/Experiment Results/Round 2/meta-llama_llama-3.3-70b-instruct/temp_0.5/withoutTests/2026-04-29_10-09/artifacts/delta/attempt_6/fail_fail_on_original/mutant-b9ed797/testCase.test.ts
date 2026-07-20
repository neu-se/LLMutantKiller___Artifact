import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the push operation with newOp when index equals ops length', () => {
    const delta = new Delta();
    delta.ops = [{ insert: 'Hello' }];
    const newOp = { insert: ' World' };
    delta.push(newOp);
    expect(delta.ops).toEqual([{ insert: 'Hello' }, { insert: ' World' }]);
  });
});