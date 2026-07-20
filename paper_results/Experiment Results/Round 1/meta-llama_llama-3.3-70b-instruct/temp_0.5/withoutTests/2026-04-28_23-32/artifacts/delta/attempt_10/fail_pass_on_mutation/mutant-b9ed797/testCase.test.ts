import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should push newOp to ops when index equals this.ops.length', () => {
    const delta = new Delta();
    const originalLength = delta.ops.length;
    const newOp: any = { insert: 'test' };
    delta.push(newOp);
    expect(delta.ops.length).toBe(originalLength + 1);
  });
});