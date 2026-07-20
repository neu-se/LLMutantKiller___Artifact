import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization concat bypasses push merging', () => {
    // After optimization fires, concat does raw append for rest.ops[1+]
    // If rest.ops[0] after push creates a mergeable situation with rest.ops[1],
    // concat won't merge but loop would
    const a = new Delta()
      .insert('A', { bold: true })
      .insert('B')
      .insert('C', { bold: true })
      .insert('D')
      .insert('E')
      .insert('F');
    const b = new Delta().retain(1).delete(1);
    // After top optimization: delta=[{insert:'A',bold}], otherIter has {delete:1}
    // Pair: insert('B') + delete(1) -> cancel (insert+delete)
    // Then otherIter exhausted, thisIter has C,D,E,F
    // insert('C',bold) + retain(Inf) -> {insert:'C',bold}, push -> merges with A -> {insert:'AC',bold}
    // insert('D') + retain(Inf) -> {insert:'D'}, push -> no merge
    // isEqual({insert:'D'},{insert:'D'}) -> TRUE, optimization fires!
    // rest = [{insert:'E'},{insert:'F'}] -> but these merged to {insert:'EF'} in a!
    // Actually a.ops = [{insert:'A',bold},{insert:'B'},{insert:'C',bold},{insert:'D'},{insert:'EF'}]
    // Wait: insert('E').insert('F') -> merged to insert('EF') during construction
    // So rest after consuming A,B,C,D = [{insert:'EF'}]
    // concat: push({insert:'EF'}) -> merges with {insert:'D'} -> {insert:'DEF'}
    // Result: [{insert:'AC',bold},{insert:'DEF'}]
    // 
    // Without optimization: same result since otherIter exhausted
    const expected = new Delta()
      .insert('AC', { bold: true })
      .insert('DEF');
    expect(a.compose(b)).toEqual(expected);
  });
});