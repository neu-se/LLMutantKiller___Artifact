import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should handle null retain in this delta when other has object retain', () => {
    const thisDelta = new Delta([{ retain: null as any }]);
    const otherDelta = new Delta([{ retain: { image: { id: 1 } } }]);
    
    // Original: condition false (null !== null fails), skip block, retain the embed
    // Mutated: typeof null === 'object' is true, enters block, Object.keys(null) throws TypeError
    expect(() => thisDelta.transform(otherDelta)).not.toThrow();
  });
});