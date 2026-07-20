import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("Delta transform embed handler condition", () => {
  it("should guard transform call with handler truthiness check", () => {
    const embedType = "guardTest";
    
    // Override getHandler to return null (bypassing the throw)
    const originalGetHandler = (Delta as any).getHandler;
    (Delta as any).getHandler = (_embedType: string) => null;
    
    const d1 = new Delta().retain({ [embedType]: { a: 1 } });
    const d2 = new Delta().retain({ [embedType]: { b: 2 } });
    
    let result: Delta | undefined;
    let threwError = false;
    try {
      result = d1.transform(d2, false);
    } catch {
      threwError = true;
    } finally {
      (Delta as any).getHandler = originalGetHandler;
    }
    
    // Original: if (handler) with null handler -> false, skip transform
    //   -> transformedData = otherData, no error
    // Mutated: if (true) -> execute, call null.transform() -> TypeError
    expect(threwError).toBe(false);
    expect(result!.ops[0].retain).toEqual({ [embedType]: { b: 2 } });
  });
});