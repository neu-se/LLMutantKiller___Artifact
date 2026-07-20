import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('does not throw when this has numeric retain and other has empty object retain', () => {
    // Directly construct ops to avoid any normalization
    // thisOp.retain = 1 (number), otherOp.retain = {} (empty object, truthy)
    // Original: typeof 1 === 'object' (false) => skip block entirely
    // Mutated: false || (1 !== null && typeof {} === 'object' && {} !== null) = true
    //   Object.keys(1) = [], embedType = undefined
    //   Object.keys({}) = [], [0] = undefined  
    //   undefined === undefined => true
    //   Delta.getHandler(undefined) throws!
    const thisDelta = new Delta([{ retain: 1 }]);
    const otherDelta = new Delta([{ retain: {} }]);

    expect(() => thisDelta.transform(otherDelta, false)).not.toThrow();
  });
});