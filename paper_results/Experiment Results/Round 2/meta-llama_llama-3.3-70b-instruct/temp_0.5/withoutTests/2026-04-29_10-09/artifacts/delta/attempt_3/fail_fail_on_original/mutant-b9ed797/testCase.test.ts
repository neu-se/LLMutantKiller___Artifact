import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the push operation with multiple ops', () => {
    const delta = new Delta();
    delta.push({ insert: 'Hello' });
    delta.push({ delete: 1 });
    delta.push({ insert: ' World' });
    expect(delta.ops.length).toBe(3);
    expect(delta.ops[0].insert).toBe('Hello');
    expect(delta.ops[1].delete).toBe(1);
    expect(delta.ops[2].insert).toBe(' World');
  });
});