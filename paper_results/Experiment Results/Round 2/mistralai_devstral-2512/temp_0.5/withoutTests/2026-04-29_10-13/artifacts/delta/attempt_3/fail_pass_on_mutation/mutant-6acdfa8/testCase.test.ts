import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta retain method', () => {
  it('should not add attributes when attributes is a non-empty object but condition fails', () => {
    const delta = new Delta();
    const attributes = { bold: true };
    delta.retain(5, attributes);
    const ops = delta.ops;
    expect(ops.length).toBe(1);
    expect(ops[0]).toEqual({ retain: 5, attributes: { bold: true } });
  });
});