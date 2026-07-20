import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should handle composition where first delta has retain and second has delete', () => {
    const delta1 = new Delta().retain(5);
    const delta2 = new Delta().delete(2);
    const result = delta1.compose(delta2);
    const expectedOps = [{ delete: 2 }];
    expect(result.ops).toEqual(expectedOps);
  });
});