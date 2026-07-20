import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose optimization', () => {
  it('should correctly handle optimization when composing with retain-only delta', () => {
    const delta1 = new Delta().insert('Hello').retain(3);
    const delta2 = new Delta().retain(8);
    const result = delta1.compose(delta2);
    // This test specifically checks the optimization path
    // The mutation changes the array index check from length-1 to length+1
    // which should cause an error when the optimization is triggered
    expect(result.ops.length).toBeGreaterThan(1);
  });
});