import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation", () => {
  it("should handle allSettled with rejected promises without crashing", async () => {
    // Q.longStackSupport triggers makeStackTraceLong -> filterStackString -> isInternalFrame
    // -> getFileNameAndLineNumber for all stack lines including non-frame lines
    Q.longStackSupport = true;
    
    const p1 = Q.reject(new Error("err1"));
    const p2 = Q.resolve(42);
    
    const results = await Q.allSettled([p1, p2]);
    
    Q.longStackSupport = false;
    
    expect(results[0].state).toBe("rejected");
    expect(results[1].state).toBe("fulfilled");
    expect((results[1] as any).value).toBe(42);
  });
});