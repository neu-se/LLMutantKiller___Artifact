import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('push()', () => {
  it('should add a new operation to the delta', () => {
    const delta = new Delta();
    const newOp1 = { insert: 'test1' };
    const newOp2 = { insert: 'test2', attributes: { bold: true } };
    delta.push(newOp1);
    delta.push(newOp2);
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0].insert).toBe('test1');
    expect(delta.ops[1].insert).toBe('test2');
    expect(delta.ops[1].attributes).toEqual({ bold: true });
  });
});