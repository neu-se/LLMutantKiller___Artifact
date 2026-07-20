import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('transform with delete and retain', () => {
    const a = new Delta().delete(1);
    const b = new Delta().retain(1);
    const expected = new Delta();
    expect(a.transform(b)).toEqual(expected);
  });
});