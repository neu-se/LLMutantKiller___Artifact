import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should check the type of arg when inserting an empty string', () => {
    const delta = new Delta();
    const arg = '';
    if (typeof arg === 'string' && arg.length === 0) {
      expect(true).toBe(false);
    } else {
      delta.insert(arg);
    }
  });
});