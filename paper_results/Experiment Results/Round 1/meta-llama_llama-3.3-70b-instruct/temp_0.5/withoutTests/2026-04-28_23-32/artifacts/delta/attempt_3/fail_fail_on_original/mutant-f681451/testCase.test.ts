import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle delete operations when transforming', () => {
    const delta1 = new Delta().insert('abc').delete(1);
    const delta2 = new Delta().retain(2).delete(1);
    const result = delta1.transform(delta2);
    expect(result.ops).toEqual([
      { insert: 'a' },
      { delete: 1 },
      { delete: 1 },
    ]);
  });
});