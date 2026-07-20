import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose()', () => {
  it('compose with firstOther being a retain, thisIter having an insert, and firstLeft being greater than thisIter.peekLength()', () => {
    const a = new Delta().insert('A');
    const b = new Delta().retain(2);
    const expected = new Delta().insert('A');
    expect(a.compose(b)).toEqual(expected);
    expect(() => {
      const c = new Delta().insert('A');
      const d = new Delta().retain(2);
      const result = c.compose(d);
      if (result.ops.length !== 1 || result.ops[0].insert !== 'A') {
        throw new Error('compose result is incorrect');
      }
    }).not.toThrow();
  });
});