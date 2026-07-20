import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transform with priority and delete operations', () => {
    const a = new Delta().delete(2).insert('ab');
    const b = new Delta().delete(1).insert('x');
    const result = a.transform(b, true);
    expect(result.ops).toEqual([{ insert: 'x' }]);
  });
});