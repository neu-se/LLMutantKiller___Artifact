import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta compose', () => {
  it('should correctly skip initial retain when first delta has insert and second has retain', () => {
    const delta1 = new Delta().insert('test');
    const delta2 = new Delta().retain(3);
    const result = delta1.compose(delta2);
    const expected = new Delta().insert('test');
    expect(result.ops).toEqual(expected.ops);
  });
});