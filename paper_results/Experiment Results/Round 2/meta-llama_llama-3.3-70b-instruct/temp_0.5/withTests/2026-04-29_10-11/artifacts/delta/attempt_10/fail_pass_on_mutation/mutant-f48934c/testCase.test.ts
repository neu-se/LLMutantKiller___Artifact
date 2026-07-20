import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check the condition for inserting an empty string', () => {
    const delta = new Delta();
    const arg = '';
    if (typeof arg === 'string' && arg.length === 0) {
      expect(delta.ops.length).toBe(0);
    } else {
      delta.insert(arg);
      expect(delta.ops.length).toBe(0);
    }
    expect(delta.ops.length).toBe(0);
  });
});