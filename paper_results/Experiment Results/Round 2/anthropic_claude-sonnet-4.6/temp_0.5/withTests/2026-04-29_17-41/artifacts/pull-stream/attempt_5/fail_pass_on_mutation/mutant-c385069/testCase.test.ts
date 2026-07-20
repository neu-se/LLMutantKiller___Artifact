import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort when not busy", () => {
  it("should call abort callback unconditionally in !busy branch", (done) => {
    const abortErr = new Error("abort");
    const calls: Array<{abort: any, cb: (end: any, data?: any) => void}> = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      calls.push({abort, cb});
    };

    const map = asyncMap((data: any, cb: (err: any, data?: any) => void) => {
      // never complete - stay busy forever
    });

    const through = map(source);

    // Read 1: source call #0 (normal read, hangs)
    through(null, (_end: any) => {});

    // Abort while not busy: source call #1 (abort)
    through(abortErr, (end: any) => {
      expect(end).toBeTruthy();
      done();
    });

    // calls[0] = normal read (abort=null)
    // calls[1] = abort read (abort=abortErr) - from whichever branch ran
    
    // Now: resolve normal read -> map called -> busy=true
    // Then: resolve abort read -> 
    //   original: cb(abort) called unconditionally -> done()
    //   mutated: if(busy) abortCb=cb -> done() NOT called
    
    setTimeout(() => {
      expect(calls.length).toBe(2);
      // Resolve normal read first to make busy=true
      calls[0].cb(null, 42);
      // Now resolve abort - busy=true
      setTimeout(() => {
        calls[1].cb(abortErr);
      }, 10);
    }, 10);
  }, 500);
});