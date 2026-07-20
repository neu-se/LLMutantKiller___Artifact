import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should correctly compose when first delta has insert and second has retain', () => {
    const delta1 = new Delta().insert('a');
    const delta2 = new Delta().retain(1);
    const result = delta1.compose(delta2);
    const expected = new Delta().retain(1);
    expect(result.ops).toEqual(expected.ops);
  });
});