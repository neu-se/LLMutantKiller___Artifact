import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort when not busy", () => {
  it("should use !busy branch so abort cb is called even if busy becomes true before source responds", (done) => {
    const abortErr = new Error("abort");
    
    let pendingNormalCb: ((end: any, data?: any) => void) | null = null;
    let pendingAbortCb: ((end: any) => void) | null = null;
    let callCount = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      callCount++;
      if (abort) {
        pendingAbortCb = cb;
        return;
      }
      pendingNormalCb = cb;
    };

    let mapCb: ((err: any, data?: any) => void) | null = null;

    const map = asyncMap((data: any, cb: (err: any, data?: any) => void) => {
      mapCb = cb;
      // Don't call cb yet - stay busy
    });

    const through = map(source);

    // First read - source hangs, busy=false
    through(null, (end: any, data: any) => {});

    // Abort while not busy (source hasn't responded yet, map not called)
    // busy=false at this point
    through(abortErr, (end: any) => {
      expect(end).toBeTruthy();
      done();
    });

    // Now resolve the normal read AFTER abort was called
    // This makes busy=true AFTER the abort branch was entered
    // In original (!busy branch): cb(abort) called in source's abort response - done
    // In mutated (else/busy branch): after source responds to abort, checks if(busy)
    //   if busy became true (because we resolved normal read), abortCb=cb, never called!
    setTimeout(() => {
      if (pendingNormalCb) {
        pendingNormalCb(null, 42); // resolve normal read -> map called -> busy=true
      }
      setTimeout(() => {
        if (pendingAbortCb) {
          pendingAbortCb(abortErr); // resolve abort -> in mutated: busy=true -> abortCb=cb, not called!
        }
        setTimeout(() => {
          if (mapCb) {
            mapCb(null, 42); // finish map -> busy=false, check abortCb
          }
        }, 10);
      }, 10);
    }, 10);
  });
});