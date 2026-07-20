import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform embed handler", () => {
  it("should skip transform when handler is falsy (original) vs always transform (mutated)", () => {
    const embedType = "testEmbed";
    
    // Register a handler first so getHandler doesn't throw
    Delta.registerEmbed(embedType, {
      compose: (a: any, b: any, keepNull: boolean) => b,
      invert: (a: any, b: any) => b,
      transform: (a: any, b: any, priority: boolean) => ({ mutated: true }),
    });
    
    // Now set the handler to a falsy value directly
    (Delta as any).handlers[embedType] = null;
    
    const d1 = new Delta().retain({ [embedType]: { x: 1 } });
    const d2 = new Delta().retain({ [embedType]: { y: 2 } });
    
    // Original: if (handler) is false, so transformedData stays as otherData = { [embedType]: { y: 2 } }
    // Mutated: if (true), tries to call null.transform(...) -> TypeError
    
    let result: Delta | undefined;
    let error: Error | undefined;
    try {
      result = d1.transform(d2, false);
    } catch (e) {
      error = e as Error;
    }
    
    // Clean up
    delete (Delta as any).handlers[embedType];
    
    // Original: succeeds, transformedData = otherData
    // Mutated: throws TypeError (cannot read property 'transform' of null)
    expect(error).toBeUndefined();
    expect(result).toBeDefined();
    expect(result!.ops[0].retain).toEqual({ [embedType]: { y: 2 } });
  });
});