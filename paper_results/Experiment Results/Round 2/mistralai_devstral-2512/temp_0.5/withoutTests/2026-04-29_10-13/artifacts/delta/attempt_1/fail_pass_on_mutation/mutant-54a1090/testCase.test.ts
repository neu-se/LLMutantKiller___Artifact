import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should correctly compose deltas with initial retain operation', () => {
    const delta1 = new Delta().retain(3);
    const delta2 = new Delta().insert('test');
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: 'test' }];
    expect(result.ops).toEqual(expectedOps);
  });
});