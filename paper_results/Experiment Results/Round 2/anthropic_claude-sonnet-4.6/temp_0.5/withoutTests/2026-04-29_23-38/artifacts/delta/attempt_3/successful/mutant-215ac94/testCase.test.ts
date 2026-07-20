import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("should correctly transform when thisOp has number retain and otherOp has empty object retain", () => {
    // thisData = 5 (number), otherData = {} (empty object)
    // Original: typeof 5 === 'object' is false -> skip block, no error, transformedData = {}
    // Mutated: enters block, Object.keys(5) = [], embedType = undefined,
    //          undefined === Object.keys({})[0] (undefined) -> true!
    //          Delta.getHandler(undefined) -> throws "no handlers for embed type undefined"
    const thisDelta = new Delta([{ retain: 5 }]);
    const otherDelta = new Delta([{ retain: {} as any }]);

    expect(() => thisDelta.transform(otherDelta, false)).not.toThrow();
    
    const result = thisDelta.transform(otherDelta, false);
    expect(result.ops).toEqual([{ retain: {} }]);
  });
});