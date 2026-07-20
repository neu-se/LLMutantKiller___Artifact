import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('transform', () => {
  it('should correctly handle delete operations', () => {
    const delta1 = new Delta().retain(1).delete(1);
    const delta2 = new Delta().insert('A');
    const expected = new Delta().insert('A');
    expect(delta1.transform(delta2, true)).toEqual(expected);
  });
});