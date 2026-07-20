import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.prototype.tap", () => {
  it("should pass the fulfilled value to callback and resolve with original value", async () => {
    const callbackArgs: any[] = [];
    
    const result = await Q.resolve(42)
      .tap(function(value: any) {
        callbackArgs.push(value);
        return Q.resolve("ignored");
      });
    
    expect(callbackArgs).toEqual([42]);
    expect(result).toBe(42);
  });
});