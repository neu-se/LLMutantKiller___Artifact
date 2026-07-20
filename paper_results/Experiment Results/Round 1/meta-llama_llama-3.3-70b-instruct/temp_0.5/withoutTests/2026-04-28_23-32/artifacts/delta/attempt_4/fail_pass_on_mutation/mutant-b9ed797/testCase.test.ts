import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should push newOp to ops when index equals this.ops.length', () => {
    const delta = new Delta();
    const newOp: any = { insert: 'test' };
    delta.ops = [];
    delta.push(newOp);
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0]).toEqual(newOp);
  });
});