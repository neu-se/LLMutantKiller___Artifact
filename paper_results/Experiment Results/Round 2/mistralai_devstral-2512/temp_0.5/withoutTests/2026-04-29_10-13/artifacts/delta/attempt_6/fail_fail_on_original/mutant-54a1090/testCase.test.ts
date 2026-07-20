import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly compose when first delta starts with retain and second with insert', () => {
    const delta1 = new Delta().retain(2, { bold: true });
    const delta2 = new Delta().insert('test');
    const result = delta1.compose(delta2);
    const expectedOps = [
      { retain: 2, attributes: { bold: true } },
      { insert: 'test' }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});