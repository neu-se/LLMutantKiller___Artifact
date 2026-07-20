import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with delete and retain', () => {
    const a = new Delta().retain(1).delete(1);
    const b = new Delta().retain(1);
    const expected = new Delta().retain(1).delete(1);
    expect(a.transform(b)).toEqual(expected);
  });
});