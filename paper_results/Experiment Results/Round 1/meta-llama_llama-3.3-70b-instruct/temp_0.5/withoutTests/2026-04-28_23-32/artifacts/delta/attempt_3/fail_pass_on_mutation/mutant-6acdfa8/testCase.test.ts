import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should not retain attributes when the condition is false', () => {
    const delta = new Delta();
    const attributes: any = {};
    delta.retain(1, attributes);
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].retain).toBe(1);
    expect(delta.ops[0].attributes).toBeUndefined();
    // If the condition is changed to always true, this test will fail
    // because delta.ops[0].attributes will be an empty object
  });
});