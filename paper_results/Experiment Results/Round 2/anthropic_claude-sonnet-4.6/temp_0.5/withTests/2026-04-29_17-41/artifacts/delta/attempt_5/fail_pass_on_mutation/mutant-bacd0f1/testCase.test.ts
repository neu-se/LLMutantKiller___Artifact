import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('retain + retain where other has null retain with attributes produces insert not retain', () => {
    const a = new Delta().retain(1);
    const b = new Delta([{ retain: null as any, attributes: { bold: true } }]);
    const result = a.transform(b, false);
    // Original: otherData = null, typeof null === 'object' && null !== null = false
    //   transformedData = length = 1, but otherOp.retain is null (falsy)
    //   so the retain branch (if otherOp.retain) is NOT entered
    //   instead falls to else-if delete check, which also fails
    //   nothing pushed... but wait the output shows {insert: undefined}
    // The op {retain: null} has Op.length = 1 (treated as insert)
    // and peekType returns 'retain' but the op itself has retain=null (falsy)
    // So we reach the else branch, length=1, thisOp=retain(1), otherOp={retain:null,attrs:{bold:true}}
    // otherOp.retain = null → falsy → if(otherOp.retain) is false
    // otherOp.delete is undefined → else if is false
    // nothing pushed
    expect(result.ops).toEqual([{ insert: undefined, attributes: { bold: true } }]);
  });
});