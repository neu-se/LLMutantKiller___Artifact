import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain start optimization', () => {
  it('detects mutation when this starts with attributed retain followed by insert', () => {
    const a = new Delta().retain(2, { bold: true }).insert('Z');
    const b = new Delta().retain(3).insert('X');
    // Original: loop doesn't run (retain !== insert for ===)
    // main loop: retain(2,bold)+retain(2)=retain(2,bold), insert('Z')+retain(1)=insert('Z'), then insert('X')
    // = retain(2,bold).insert('Z').insert('X') = retain(2,bold).insert('ZX')
    // Mutated: copies retain(2,bold) early, otherIter.next(2), 
    // main loop: insert('Z') vs retain(1)+insert('X'): push insert('X'), then insert('Z')+retain(1)=insert('Z')
    // = retain(2,bold).insert('X').insert('Z') = retain(2,bold).insert('XZ')
    const expected = new Delta().retain(2, { bold: true }).insert('ZX');
    expect(a.compose(b)).toEqual(expected);
  });
});