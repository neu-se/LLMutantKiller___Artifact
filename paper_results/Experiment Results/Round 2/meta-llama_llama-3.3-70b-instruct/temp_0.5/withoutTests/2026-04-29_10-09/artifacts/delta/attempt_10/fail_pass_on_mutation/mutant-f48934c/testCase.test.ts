import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should handle empty string insert correctly', () => {
    const delta = new Delta();
    delta.insert('');
    expect(delta.length()).toBe(0);
    delta.insert('a');
    expect(delta.length()).toBe(1);
    delta.insert('');
    expect(delta.length()).toBe(1);
  });
});