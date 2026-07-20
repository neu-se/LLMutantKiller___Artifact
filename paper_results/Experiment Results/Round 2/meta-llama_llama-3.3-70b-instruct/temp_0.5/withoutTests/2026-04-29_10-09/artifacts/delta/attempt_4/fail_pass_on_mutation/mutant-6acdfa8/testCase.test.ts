import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should not retain attributes when they are empty objects', () => {
    const delta = new Delta();
    delta.retain(5, {});
    expect(delta.ops[0].attributes).not.toEqual({});
  });
});