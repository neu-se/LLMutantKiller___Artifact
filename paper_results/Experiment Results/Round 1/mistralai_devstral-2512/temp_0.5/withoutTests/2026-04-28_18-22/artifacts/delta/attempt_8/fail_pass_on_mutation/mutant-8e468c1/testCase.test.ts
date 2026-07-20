import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should skip initial retain when first delta has insert and second has plain retain', () => {
    const delta1 = new Delta().insert('abc');
    const delta2 = new Delta().retain(1);
    const result = delta1.compose(delta2);
    const expected = new Delta().insert('abc');
    expect(result.ops).toEqual(expected.ops);
  });
});