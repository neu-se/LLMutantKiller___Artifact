import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transform with overlapping deletes', () => {
    const a = new Delta().delete(3);
    const b = new Delta().delete(3);
    const result = a.transform(b);
    expect(result.ops).toEqual([]);
  });
});