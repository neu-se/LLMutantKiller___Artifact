import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('transform: this delete with other insert should retain the insert position', () => {
    // When this deletes and other inserts at the same position
    // the insert should be preserved
    const a = new Delta().delete(1);
    const b = new Delta().insert('x');
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ insert: 'x' }]);
  });
});