import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle the push operation with multiple ops', () => {
    const delta = new Delta();
    delta.push({ insert: 'Hello' });
    delta.push({ insert: ' World' });
    delta.push({ delete: 1 });
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0].insert).toBe('Hello World');
    expect(delta.ops[1].delete).toBe(1);
  });
});