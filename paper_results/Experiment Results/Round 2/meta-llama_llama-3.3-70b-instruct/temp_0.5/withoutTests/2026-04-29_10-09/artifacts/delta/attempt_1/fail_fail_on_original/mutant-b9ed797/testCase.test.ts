import Delta from '../src/Delta';

describe('Delta', () => {
  it('should correctly handle the push operation', () => {
    const delta = new Delta();
    delta.push({ insert: 'Hello' });
    delta.push({ insert: ' World' });
    expect(delta.ops.length).toBe(2);
    expect(delta.ops[0].insert).toBe('Hello');
    expect(delta.ops[1].insert).toBe(' World');
  });
});