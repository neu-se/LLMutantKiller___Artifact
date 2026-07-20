import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta retain method', () => {
  it('should not add attributes when attributes is null', () => {
    const delta = new Delta();
    delta.retain(5, null);
    const ops = delta.ops;
    expect(ops.length).toBe(1);
    expect(ops[0]).toEqual({ retain: 5 });
    expect(ops[0].attributes).toBeUndefined();
  });
});