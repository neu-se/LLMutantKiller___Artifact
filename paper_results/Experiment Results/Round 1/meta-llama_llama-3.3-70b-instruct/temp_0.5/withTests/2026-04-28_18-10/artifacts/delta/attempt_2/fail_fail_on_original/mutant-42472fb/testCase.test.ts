import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('compose', () => {
  it('retain start optimization with insert', () => {
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .delete(1);
    const b = new Delta().retain(3).insert('D');
    const firstOp = b.ops[0];
    const firstOther = { retain: 3 };
    let firstLeft = firstOther.retain;
    while (a.ops.length > 0 && a.ops[0].insert && a.ops[0].insert.length <= firstLeft) {
      firstLeft -= a.ops[0].insert.length;
      a.ops.shift();
    }
    if (firstOther.retain - firstLeft > 0) {
      b.ops.shift();
    }
    const expected = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .delete(1);
    expect(a.compose(b)).toEqual(expected);
  });
});