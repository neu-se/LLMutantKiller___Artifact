import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should handle transform when thisOp has null retain and otherOp has object retain', () => {
    // thisOp.retain = null, otherOp.retain = { image: 'x' }
    // Original: typeof null === 'object' (true) && null !== null (false) → skip block
    // Mutated: (false) || (typeof {image:'x'} === 'object' && {image:'x'} !== null) = true → enter block
    //   Object.keys(null) → TypeError!
    
    const thisDelta = new Delta([{ retain: null as any }, { insert: 'x' }]);
    const otherDelta = new Delta([{ retain: { image: 'x' } }, { insert: 'y' }]);
    
    expect(() => {
      thisDelta.transform(otherDelta, false);
    }).not.toThrow();
  });
});