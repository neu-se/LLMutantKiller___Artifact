import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain start optimization: other is only a partial retain over inserts', () => {
    // a has 3 inserts, b retains only 2 of them - optimization only moves 2 inserts
    // then otherIter is exhausted, main loop uses early-return concat with rest
    const a = new Delta().insert('A').insert('B').insert('C');
    const b = new Delta().retain(2);
    const expected = new Delta().insert('A').insert('B').insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});