import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('should not throw when thisOp retains a number and otherOp retains an empty embed object', () => {
    const thisDelta = new Delta([{ retain: 1 }, { insert: 'a' }]);
    const otherDelta = new Delta([{ retain: {} as any }, { insert: 'b' }]);
    
    expect(() => thisDelta.transform(otherDelta, false)).not.toThrow();
  });
});