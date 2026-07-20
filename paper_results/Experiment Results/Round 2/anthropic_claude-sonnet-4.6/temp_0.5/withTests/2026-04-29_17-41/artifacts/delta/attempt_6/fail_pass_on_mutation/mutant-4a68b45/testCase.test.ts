import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length', () => {
  it('retain object op has length 1', () => {
    // An op with retain as a non-null object should return 1
    // In mutated code, null retain also returns 1, but original falls through to insert
    const retainObjectOp: any = { retain: { key: 'value' } };
    expect(Op.length(retainObjectOp)).toEqual(1);
    
    // With null retain and string insert:
    // original: falls to else, returns string length
    // mutated: returns 1 (treats null retain as object retain)
    const nullRetainWithInsert: any = { insert: 'test', retain: null };
    expect(Op.length(nullRetainWithInsert)).toEqual(4);
  });
});