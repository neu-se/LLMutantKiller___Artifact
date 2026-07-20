import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain attributes when they are empty', () => {
    const delta = new Delta();
    const attributes: any = {};
    delta.retain(1, attributes);
    const op = delta.ops[0];
    const keys = Object.keys(op);
    expect(keys.includes('attributes')).toBe(false); // This should fail on the mutated code
    expect(keys.length).toBe(1); // This should fail on the mutated code
    expect(op).not.toHaveProperty('attributes'); // This should fail on the mutated code
  });
});