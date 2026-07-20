import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization fires on identical embed inserts', () => {
    const a = new Delta()
      .insert({ img: 'x' }, { bold: true })
      .insert({ img: 'x' }, { italic: true })
      .insert('C');
    const b = new Delta()
      .retain(1, { bold: null })
      .retain(1, { italic: null })
      .retain(1, { color: 'red' });
    // Original: optimization fires after first pair, rest=[{insert:{img:'x'},italic},{insert:'C'}]
    // concat appends them directly, skipping remaining otherIter ops
    // Result: [{insert:{img:'x'}}, {insert:{img:'x'},italic}, {insert:'C'}]
    //
    // Mutated: no optimization, processes all pairs
    // Result: [{insert:{img:'x'}}, {insert:{img:'x'}}, {insert:'C',color:'red'}]
    const expected = new Delta()
      .insert({ img: 'x' })
      .insert({ img: 'x' }, { italic: true })
      .insert('C');
    expect(a.compose(b)).toEqual(expected);
  });
});