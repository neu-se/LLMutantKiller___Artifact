import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('Op.length with object retain', () => {
  it('object retain via Delta slice has length 1', () => {
    // retain with object value should have length 1
    // This exercises the branch: typeof op.retain === 'object' && op.retain !== null
    const op: any = { retain: { embed: 'value' } };
    expect(Op.length(op)).toEqual(1);
    
    // null retain should NOT match the object retain branch in original
    // so it falls through to insert branch
    const op2: any = { retain: null };
    // original: falls to else, no insert string, returns 1
    // mutated: matches object branch, returns 1
    // Both return 1 here... need insert string
    const op3: any = { retain: null, insert: 'abcdefgh' };
    expect(Op.length(op3)).toEqual(8);
  });
});