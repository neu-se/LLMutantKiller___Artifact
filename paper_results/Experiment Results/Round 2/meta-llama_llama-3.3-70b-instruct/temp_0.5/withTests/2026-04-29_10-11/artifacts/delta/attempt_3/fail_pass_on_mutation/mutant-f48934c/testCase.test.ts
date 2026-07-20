import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not insert an empty string when typeof arg === "string" check', () => {
    const delta = new Delta();
    const arg = '';
    const originalLength = delta.length();
    delta.insert(arg);
    expect(delta.length()).toBe(originalLength);
  });
});