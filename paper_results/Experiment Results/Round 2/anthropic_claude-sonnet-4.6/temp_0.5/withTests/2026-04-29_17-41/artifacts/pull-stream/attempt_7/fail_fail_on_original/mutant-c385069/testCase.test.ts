import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("abort callback is called when not busy and source responds after busy becomes true", (done) => {
    const abortErr = new Error("abort");
    const sourceCalls: Array<{abort: any, cb: (end: any, data?: any) => void}> = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      sourceCalls.push({abort, cb});
    };

    const mapCbs: Array<(err: any, data?: any) => void> = [];
    
    const map = asyncMap((data: any, cb: (err: any, data?: any) => void) => {
      mapCbs.push(cb);
      // Never complete - stay busy
    });

    const through = map(source);

    // Start normal read - source hangs, busy=false
    through(null, (_end: any) => {});

    // Abort while busy=false
    through(abortErr, (end: any) => {
      expect(end).toBeTruthy();
      done();
    });

    setTimeout(() => {
      // Verify source was called twice (once normal, once for abort)
      expect(sourceCalls.length).toBe(2);
      expect(sourceCalls[0].abort).toBeFalsy();
      expect(sourceCalls[1].abort).toBe(abortErr);

      // Resolve normal read -> map invoked -> busy=true
      sourceCalls[0].cb(null, 42);
      expect(mapCbs.length).toBe(1); // map was called, busy=true

      // Now resolve abort while busy=true
      // Original (!busy branch): cb(abort) called unconditionally
      // Mutated (else branch): if(busy) -> abortCb=cb -> cb never called
      sourceCalls[1].cb(abortErr);
    }, 50);
  }, 500);
});