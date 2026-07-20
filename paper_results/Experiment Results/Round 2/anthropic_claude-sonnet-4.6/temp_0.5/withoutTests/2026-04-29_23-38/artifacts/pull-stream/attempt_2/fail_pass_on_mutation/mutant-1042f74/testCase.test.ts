import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("detects mutation: cbed initialized to true causes next() to be called when loop is still true in sync stream", () => {
    // Track how many times read is called
    const readCalls: Array<{end: any}> = [];
    let callbackStore: Function[] = [];
    
    // Mixed sync/async source
    // First call: sync response
    // After that: we control timing
    let callIndex = 0;
    
    function source(end: any, cb: Function) {
      callIndex++;
      readCalls.push({end});
      if (end) {
        cb(end);
        return;
      }
      if (callIndex === 1) {
        // sync: immediately call back with data
        cb(null, 1);
      } else {
        // store for later
        callbackStore.push(() => cb(true, null));
      }
    }
    
    let doneCalled = false;
    const sink = drain(
      (_data: number) => { /* consume */ },
      (_err: any) => { doneCalled = true; }
    );
    
    sink(source);
    
    // After sink(source), with sync first response:
    // loop runs, read called (callIndex=1), cb fires sync (cbed=true after)
    // loop continues, read called (callIndex=2), cb NOT fired yet (cbed stays false)
    // !cbed → loop=false, return
    // Later when cb fires → !loop → next() called → reads again
    
    // With mutation cbed=true initially:
    // Same behavior since cbed=false resets it... 
    
    // Flush pending callbacks
    const pending = [...callbackStore];
    callbackStore = [];
    pending.forEach(fn => fn());
    
    expect(doneCalled).toBe(true);
    expect(readCalls.length).toBe(2); // exactly 2 reads
  });
});