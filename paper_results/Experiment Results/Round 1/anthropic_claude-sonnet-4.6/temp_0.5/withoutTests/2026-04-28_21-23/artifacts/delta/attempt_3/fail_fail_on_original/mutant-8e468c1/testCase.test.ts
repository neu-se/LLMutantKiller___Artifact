import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('correctly composes when other starts with plain retain followed by insert and this starts with delete then insert', () => {
    // this: delete 3 chars, insert "ABCDE" (output is "ABCDE", 5 chars)
    // other: retain 5 (keep all 5 output chars), then insert "!"
    // Expected: the "!" should appear after "ABCDE", not in the middle
    const delta1 = new Delta([{ delete: 3 }, { insert: 'ABCDE' }]);
    const delta2 = new Delta().retain(5).insert('!');
    
    const result = delta1.compose(delta2);
    
    // Original: correctly produces delete(3) + insert("ABCDE!")
    // Mutated: incorrectly produces delete(3) + insert("AB!CDE") because
    // the optimization loop copies delete(3) and advances other's retain by 3,
    // leaving only retain(2) which only covers "AB" before the "!" is inserted
    expect(result).toEqual(new Delta([{ delete: 3 }, { insert: 'ABCDE!' }]));
  });
});