import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should handle initial retain with attributes when first delta has insert', () => {
    const delta1 = new Delta().insert('hello');
    const delta2 = new Delta().retain(3, { bold: true });
    const result = delta1.compose(delta2);
    const expectedOps = [
      { insert: 'hel', attributes: { bold: true } },
      { insert: 'lo' }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});