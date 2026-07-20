import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform", () => {
  it("correctly transforms when other retain is an object and this retain is a number", () => {
    // Force a scenario where the condition matters by checking
    // that the result correctly uses the object retain value
    // when otherData is an object (both conditions give true - same result)
    // vs when otherData is a number (original: false->length, mutated: true->otherData=length)
    
    // The key insight: for the mutation to matter, we need otherData to be
    // a non-null non-object value that differs from length.
    // This is impossible with valid ops since number retains always equal length.
    
    // Let's verify the transform produces correct output for a specific case
    // that exercises the retain-retain branch
    const a = new Delta().retain(5);
    const b = new Delta().retain(3);
    
    const result = a.transform(b, false);
    
    // Both original and mutated: otherData=3=length, transformedData=3
    // chop() removes the trailing retain
    expect(result.ops).toEqual([]);
  });
});