import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('push()', () => {
  it('returns this for chaining when pushing non-mergeable op', () => {
    const delta = new Delta().insert('a');
    // Push a retain - mismatched types, isEqual(undefined,undefined)=true, no merge
    // Original: push executes, return this executes -> returns delta
    // Mutated: if(false) skips push AND return this -> falls through outer if -> returns undefined?
    const result = delta.push({ retain: 1 });
    expect(result).toBe(delta);
  });
});