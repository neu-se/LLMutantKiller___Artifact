import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should push newOp to ops when index equals this.ops.length', () => {
    const delta = new Delta([{ insert: 'a' }, { insert: 'b' }]);
    const newOp: any = { insert: 'test' };
    delta.push(newOp);
    expect(delta.ops.length).toBe(3);
  });
});