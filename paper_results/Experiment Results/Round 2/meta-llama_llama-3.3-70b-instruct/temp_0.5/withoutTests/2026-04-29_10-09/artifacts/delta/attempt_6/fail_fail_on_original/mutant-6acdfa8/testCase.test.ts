import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should not retain attributes when they are empty objects', () => {
    const delta = new Delta();
    delta.retain(5, { a: undefined });
    expect(delta.ops[0].attributes).toBeUndefined();
  });
});