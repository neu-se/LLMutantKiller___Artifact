import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the push operation when index is equal to ops length', () => {
    const delta = new Delta();
    delta.ops = [{ insert: 'Hello' }];
    delta.push({ insert: ' World' });
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0].insert).toBe('Hello');
    expect(delta.ops[1].insert).toBe(' World');
  });
});