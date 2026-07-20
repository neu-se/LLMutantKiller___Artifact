import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('optimization condition', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1);
    const c = new Delta().insert('B');
    const result = a.compose(b);
    const d = new Delta().retain(2);
    const expected = result.compose(c).compose(d);
    const result2 = a.compose(b).compose(c).compose(d);
    expect(result2).toEqual(expected);
  });
});