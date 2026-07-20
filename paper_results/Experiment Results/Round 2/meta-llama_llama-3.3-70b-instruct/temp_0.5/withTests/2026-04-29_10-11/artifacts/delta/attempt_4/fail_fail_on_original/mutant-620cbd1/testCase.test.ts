import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('compose with retain and retain', () => {
    const a = new Delta().retain(1);
    const b = new Delta().retain(1);
    const expected = new Delta().retain(1);
    expect(a.compose(b)).toEqual(expected);
  });
});