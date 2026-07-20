import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.any pendingCount via array_reduce", () => {
  it("should correctly count pending promises using array_reduce callback", async () => {
    // Q.any uses array_reduce to iterate promises and increment pendingCount
    // If array_reduce callback is never called, pendingCount stays 0
    // and the promise would never resolve or reject properly
    const resolved = Q.defer();
    resolved.resolve("success");
    
    // With 3 items, if array_reduce callback isn't called, 
    // pendingCount would be 0 and behavior changes
    const result = await Q.any([
      Q.reject(new Error("a")),
      Q.reject(new Error("b")), 
      resolved.promise
    ]);
    expect(result).toBe("success");
  });
});