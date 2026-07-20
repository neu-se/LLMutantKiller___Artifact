import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should not retain empty attributes', () => {
    const delta = new Delta();
    delta.retain(5, {});
    expect(delta.ops.length).toBe(1);
    expect(delta.ops[0].attributes).toBeDefined();
  });
});