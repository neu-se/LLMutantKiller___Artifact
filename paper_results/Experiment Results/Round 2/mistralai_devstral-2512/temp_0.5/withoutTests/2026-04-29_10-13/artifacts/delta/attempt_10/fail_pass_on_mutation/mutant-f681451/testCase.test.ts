import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('should correctly handle delete operations in transform with priority false', () => {
    const delta1 = new Delta().delete(2);
    const delta2 = new Delta().retain(2);
    const result = delta1.transform(delta2, false);
    const expected = new Delta();
    expect(result.ops).toEqual(expected.ops);
  });
});