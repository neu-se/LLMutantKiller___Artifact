import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should correctly skip delete operations during transform', () => {
    const delta1 = new Delta().delete(5);
    const delta2 = new Delta().retain(5);
    const result = delta1.transform(delta2, false);
    const expected = new Delta();
    expect(result.ops).toEqual(expected.ops);
  });
});