import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should handle composition with initial retain followed by insert and retain', () => {
    const delta1 = new Delta().retain(3);
    const delta2 = new Delta().insert('a').retain(2, { bold: true });
    const result = delta1.compose(delta2);
    const expectedOps = [
      { insert: 'a' },
      { retain: 2, attributes: { bold: true } }
    ];
    expect(result.ops).toEqual(expectedOps);
  });
});