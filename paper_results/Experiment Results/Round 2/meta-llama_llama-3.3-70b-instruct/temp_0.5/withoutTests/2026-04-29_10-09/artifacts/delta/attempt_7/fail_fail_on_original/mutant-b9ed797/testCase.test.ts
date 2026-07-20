import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the push operation when index is not equal to ops length', () => {
    const delta = new Delta();
    delta.ops = [{ insert: 'Hello' }, { insert: ' World' }];
    const newOp = { insert: '!' };
    delta.push(newOp);
    expect(delta.ops.length).toBe(3);
    expect(delta.ops[0].insert).toBe('Hello');
    expect(delta.ops[1].insert).toBe(' World');
    expect(delta.ops[2].insert).toBe('!');
  });
});