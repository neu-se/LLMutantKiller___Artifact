import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should handle empty delta composition with retain', () => {
    const delta1 = new Delta().retain(3);
    const delta2 = new Delta();
    const result = delta1.compose(delta2);
    const expectedOps = [];
    expect(result.ops).toEqual(expectedOps);
  });
});