import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('invert()', () => {
  it('correctly handles null retain op without throwing', () => {
    const delta = new Delta();
    // Directly set ops to include a null retain (bypassing push/cloneDeep)
    delta.ops = [{ retain: null as any }];
    const base = new Delta().insert('a');
    
    // Original code: typeof null === 'object' && null !== null → false
    // Branch 4 is skipped, falls to return baseIndex
    // No ops added to inverted, result is empty delta
    
    // Mutated code: else if (true) → branch 4 executes
    // getEmbedTypeAndData(null, 'a') throws "cannot retain a object"
    
    const inverted = delta.invert(base);
    expect(inverted.ops).toHaveLength(0);
  });
});