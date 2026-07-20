import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame", () => {
  it("promise stack should contain early q.js frames in original but not mutated", () => {
    Q.longStackSupport = true;
    const d = Q.defer();
    // d.promise.stack contains the stack at defer() creation time
    // This includes q.js frames
    const promiseStack = (d.promise as any).stack;
    Q.longStackSupport = false;
    // The promise stack should exist
    expect(promiseStack).toBeDefined();
    // Now test filterStackString behavior via makeStackTraceLong
    ...
  });
});