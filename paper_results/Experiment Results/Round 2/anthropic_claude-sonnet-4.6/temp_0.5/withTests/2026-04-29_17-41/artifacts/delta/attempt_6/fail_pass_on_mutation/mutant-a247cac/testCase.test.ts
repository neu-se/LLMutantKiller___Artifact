import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('retain end optimization merges boundary ops correctly', () => {
    // otherIter exhausted after processing one retain, thisIter has remaining inserts
    // The optimization concatenates rest directly; without it the loop processes them
    // The concat can merge the last op of delta with first op of rest at the boundary
    const a = new Delta()
      .insert('Hello')
      .insert(' World');
    const b = new Delta().retain(5);
    // After processing retain(5), otherIter is exhausted, thisIter has ' World' left
    // Optimization: concat rest (' World') with delta so far ('Hello')
    // This should merge into 'Hello World'
    const expected = new Delta().insert('Hello World');
    expect(a.compose(b)).toEqual(expected);
  });
});