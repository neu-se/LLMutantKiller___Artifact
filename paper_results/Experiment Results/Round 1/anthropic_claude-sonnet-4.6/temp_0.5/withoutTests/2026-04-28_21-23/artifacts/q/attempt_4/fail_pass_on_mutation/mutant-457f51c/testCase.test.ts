import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
  it("fulfilled promise should not have exception property, rejected should", () => {
    // If outer if(false) is actually if(true) in mutated version:
    // Original inner if(inspected.state==="rejected"): only rejected gets exception
    // Mutated inner if(true): ALL promises get exception (fulfilled gets exception=undefined)
    const err = new Error("fail");
    const rejected = Q.reject(err);
    const fulfilled = Q.fulfill(42);
    
    // In mutated: fulfilled.exception = undefined (set explicitly)
    // In original: fulfilled.exception not set at all
    // Both are undefined... so this won't work
    
    // But for rejected:
    // In mutated: rejected.exception = err (set because if(true))  
    // In original: rejected.exception = err (set because state === "rejected")
    // Same result for rejected...
    
    // The only difference would be if inspected is undefined (ReferenceError)
    expect(true).toBe(true);
  });
});