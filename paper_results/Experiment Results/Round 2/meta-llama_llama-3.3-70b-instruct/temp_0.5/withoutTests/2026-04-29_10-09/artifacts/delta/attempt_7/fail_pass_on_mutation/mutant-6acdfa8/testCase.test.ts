import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should not retain empty attributes', () => {
    const delta = new Delta();
    delta.retain(5, {});
    expect(delta.ops[0].attributes).toBeUndefined();
    const delta2 = new Delta();
    delta2.retain(5, { a: 1 });
    expect(delta2.ops[0].attributes).toEqual({ a: 1 });
    const delta3 = new Delta();
    delta3.retain(5, {});
    expect(delta3.ops[0].attributes).toBeUndefined();
  });
});