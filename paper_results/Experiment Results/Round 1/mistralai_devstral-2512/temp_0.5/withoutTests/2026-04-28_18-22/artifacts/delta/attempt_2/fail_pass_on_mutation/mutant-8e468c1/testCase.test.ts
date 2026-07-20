import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly handle initial retain in second delta when first delta has insert', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(2, { bold: true });
    const result = delta1.compose(delta2);
    const expectedOps = [
      { insert: 'te', attributes: { bold: true } },
      { insert: 'st' }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});