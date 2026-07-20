import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain attributes when they are empty', () => {
    const delta = new Delta();
    const attributes: any = {};
    delta.retain(1, attributes);
    const op = delta.ops[0];
    const keys = Object.keys(op);
    if (keys.includes('attributes')) {
      expect(keys.length).toBe(2); // This should fail on the original code
    } else {
      expect(keys.length).toBe(1); // This should pass on the original code
    }
  });
});