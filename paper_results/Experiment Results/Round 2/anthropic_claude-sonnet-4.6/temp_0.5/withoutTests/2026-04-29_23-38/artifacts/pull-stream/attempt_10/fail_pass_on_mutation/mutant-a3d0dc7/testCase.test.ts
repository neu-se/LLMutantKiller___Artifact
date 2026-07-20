import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js"

describe("values source", () => {
  it("onAbort should only be called when abort is truthy, not during normal reads", () => {
    const onAbortCalls: any[] = [];
    const onAbort = (err: any) => onAbortCalls.push(err);
    
    // In mutated code: if(true) return abortCb(undefined, undefined, onAbort)
    // abortCb calls onAbort(undefined) during setup phase
    // In original code: if(abort) where abort=undefined -> false, so onAbort never called during setup
    
    values([1, 2, 3], onAbort);
    
    // onAbort should NOT have been called just from creating the source
    expect(onAbortCalls.length).toBe(0);
  });
});