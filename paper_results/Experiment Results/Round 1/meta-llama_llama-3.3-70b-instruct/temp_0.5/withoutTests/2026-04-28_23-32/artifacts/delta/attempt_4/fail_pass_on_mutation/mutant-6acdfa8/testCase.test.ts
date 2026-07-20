import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain attributes when they are empty', () => {
    const delta = new Delta();
    const attributes: any = {};
    delta.retain(1, attributes);
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].retain).toBe(1);
    expect(delta.ops[0].attributes).toBeUndefined();
    const op = delta.ops[0];
    expect(Object.keys(op).length).toBe(1); // This will fail on the mutated code
  });
});