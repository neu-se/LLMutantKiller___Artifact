import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transform delete vs retain with following ops', () => {
    // this: delete(1) + retain(1)
    // other: retain(1) + retain(1)  
    // When this deletes pos 0 and retains pos 1,
    // other's retain(1) at pos 0 should be dropped,
    // other's retain(1) at pos 1 should become retain(1)
    const a = new Delta().delete(1).retain(1);
    const b = new Delta().retain(2);
    const result = a.transform(b);
    // pos 0: this=delete, other=retain -> dropped (continue)
    // pos 1: this=retain, other=retain -> retain(1) (but chopped since trailing)
    expect(result.ops).toEqual([]);
  });
});