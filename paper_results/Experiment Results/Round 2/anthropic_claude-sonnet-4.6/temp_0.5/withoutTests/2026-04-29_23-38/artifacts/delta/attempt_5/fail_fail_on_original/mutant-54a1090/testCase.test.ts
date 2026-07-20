import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta compose', () => {
  it('correctly composes when this has inserts with different attributes and other has retain-delete-retain', () => {
    // Use Delta constructor directly to bypass push merging
    // insert('A', {bold:true}) and insert('BC') won't merge due to different attributes
    const a = new Delta().insert('A', { bold: true }).insert('BC');
    // a.ops = [{insert:'A', attributes:{bold:true}}, {insert:'BC'}]
    // b: retain(1) + delete(1) + retain(1)
    // firstLeft = 1, optimization pushes insert('A',{bold:true}), firstLeft=0
    // Normal: thisOp=insert('B'), otherOp=retain(1) → insert('B')
    //         thisOp=insert('C'), otherOp=delete(1) → skip
    // Result: insert('A',{bold:true}) + insert('B')
    // Without optimization: 
    //   thisOp=insert('A',{bold:true}), otherOp=retain(1) → insert('A',{bold:true})
    //   thisOp=insert('B'), otherOp=delete(1) → skip
    //   thisOp=insert('C'), otherOp=retain(1) → insert('C')
    // Result: insert('A',{bold:true}) + insert('C')
    const b = new Delta().retain(1).delete(1).retain(1);
    const result = a.compose(b);
    expect(result.ops).toEqual([{ insert: 'A', attributes: { bold: true } }, { insert: 'B' }]);
  });
});