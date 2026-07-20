import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose() retain end optimization', () => {
  it('detects optimization by preserving null attributes on trailing inserts', () => {
    // Build 'a' such that it has an insert with null attribute at the end
    // This can happen after composing: insert 'X' bold:true, then retain 1 bold:null
    const a = new Delta().insert('A').insert('X', { bold: null });
    const b = new Delta().retain(1); // just retain A, then other is exhausted
    // With optimization: trailing insert 'X' with bold:null gets concat'd -> preserved
    // Without optimization: insert 'X' pairs with {retain:Infinity}, compose(bold:null, undefined, false) -> null removed
    // But wait - does Delta even allow bold:null in insert? push() would keep it if attributes object is non-empty
    // Actually bold:null means Object.keys({bold:null}).length > 0, so it IS stored
    const result = a.compose(b);
    // With optimization: insert 'X' bold:null is preserved
    // Without optimization: insert 'X' bold:null -> compose removes null -> insert 'X' no attributes
    // Then 'A' and 'X' would merge into 'AX' without attributes
    expect(result.ops).toEqual([{ insert: 'A' }, { insert: 'X', attributes: { bold: null } }]);
  });
});