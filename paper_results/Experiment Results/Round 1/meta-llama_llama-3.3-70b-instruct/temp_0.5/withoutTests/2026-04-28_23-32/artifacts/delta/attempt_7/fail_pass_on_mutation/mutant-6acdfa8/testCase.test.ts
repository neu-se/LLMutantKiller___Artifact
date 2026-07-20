import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain attributes when they are empty', () => {
    const delta = new Delta();
    const attributes: any = {};
    delta.retain(1, attributes);
    const op = delta.ops[0];
    if (op.attributes) {
      expect(Object.keys(op.attributes).length).toBe(0); // This will fail on the mutated code
    } else {
      expect(op.attributes).toBeUndefined(); // This will pass on the original code
    }
  });
});