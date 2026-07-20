import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('invert() mutation detection', () => {
  it('invert a delete operation should not enter embed branch', () => {
    // A delete op: op.delete is truthy, op.retain is undefined (null check: undefined !== null is true)
    // With mutation `true && op.retain !== null`: undefined !== null is TRUE
    // So delete ops would incorrectly enter the embed branch
    const delta = new Delta().delete(2);
    const base = new Delta().insert('Hello');
    const expected = new Delta().insert('He');
    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
  });
});