import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('should compose correctly', () => {
    const a = new Delta().retain(1);
    const b = new Delta().insert('B');
    const c = new Delta().retain(1);
    const expected = new Delta().insert('B').retain(1);
    expect(a.compose(b).compose(c)).toEqual(expected);
  });
});