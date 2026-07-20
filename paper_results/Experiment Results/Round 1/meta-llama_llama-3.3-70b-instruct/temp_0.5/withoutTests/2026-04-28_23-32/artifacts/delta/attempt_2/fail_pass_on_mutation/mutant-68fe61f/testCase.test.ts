import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should create a new Delta instance correctly', () => {
    const delta = new Delta();
    expect(delta).toBeInstanceOf(Delta);
    expect(delta.ops).toBeInstanceOf(Array);
    expect(delta.ops.length).toBe(0);
  });
});