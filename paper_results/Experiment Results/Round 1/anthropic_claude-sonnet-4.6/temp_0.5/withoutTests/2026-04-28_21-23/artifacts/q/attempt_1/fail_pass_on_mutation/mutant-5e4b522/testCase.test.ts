import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
  it("should correctly resolve a deferred promise and fulfill with the expected value", async () => {
    const deferred = Q.defer();
    
    // Resolve the deferred with a known value
    deferred.resolve(42);
    
    const result = await deferred.promise;
    expect(result).toBe(42);
    
    // Verify basic Q functionality works as expected
    const fulfilled = Q(100);
    const inspected = fulfilled.inspect();
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(100);
    
    // Verify rejected promise
    const rejected = Q.reject(new Error("test error"));
    const rejectedInspected = rejected.inspect();
    expect(rejectedInspected.state).toBe("rejected");
    expect(rejectedInspected.reason.message).toBe("test error");
  });
});