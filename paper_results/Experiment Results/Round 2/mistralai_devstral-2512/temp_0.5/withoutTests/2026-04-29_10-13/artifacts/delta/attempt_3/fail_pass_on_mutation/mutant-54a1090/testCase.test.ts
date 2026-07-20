import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly handle initial retain operation without attributes', () => {
    const delta1 = new Delta().retain(3);
    const delta2 = new Delta().insert('test');
    const result = delta1.compose(delta2);
    const expectedOps = [{ insert: 'test' }];
    expect(result.ops).toEqual(expectedOps);
  });
});