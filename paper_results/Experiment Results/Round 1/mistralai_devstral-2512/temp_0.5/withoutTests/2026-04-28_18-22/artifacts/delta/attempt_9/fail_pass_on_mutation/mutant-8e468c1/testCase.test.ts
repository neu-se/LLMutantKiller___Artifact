import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly handle initial retain when first delta has insert and second has retain with attributes', () => {
    const delta1 = new Delta().insert('abc');
    const delta2 = new Delta().retain(2, { bold: true });
    const result = delta1.compose(delta2);
    const expectedOps = [
      { insert: 'ab', attributes: { bold: true } },
      { insert: 'c' }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});