import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('optimization condition', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(1).insert('B');
    const expected = new Delta().insert('A').insert('B');
    expect(a.compose(b)).toEqual(expected);
    // If the optimization condition is false, it should not return early
    const c = new Delta().insert('A');
    const d = new Delta().retain(1).insert('C');
    const e = new Delta().retain(1);
    const result = c.compose(d).compose(e);
    expect(result).toEqual(new Delta().insert('A').insert('C'));
  });
});