import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose optimization', () => {
  it('should correctly optimize when composing with retain-only delta', () => {
    const delta1 = new Delta().insert('Hello').retain(3);
    const delta2 = new Delta().retain(8);
    const result = delta1.compose(delta2);
    expect(result.ops.length).toBe(2);
    expect(result.ops[1]).toEqual({ retain: 3 });
  });
});