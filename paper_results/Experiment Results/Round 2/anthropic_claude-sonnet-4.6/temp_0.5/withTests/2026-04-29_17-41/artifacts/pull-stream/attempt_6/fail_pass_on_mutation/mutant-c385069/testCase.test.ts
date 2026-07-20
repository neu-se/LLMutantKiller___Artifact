import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort when not busy", () => {
  it("abort callback called when !busy branch used vs else branch behavior differs", (done) => {
    const abortErr = new Error("abort");
    const calls: Array<{abort: any, cb: (end: any, data?: any) => void}> = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      calls.push({abort, cb});
    };

    let mapCbRef: ((err: any, data?: any) => void) | null = null;
    
    const map = asyncMap((data: any, cb: (err: any, data?: any) => void) => {
      mapCbRef = cb;
      // Stay busy - don't call cb
    });

    const through = map(source);

    through(null, (_end: any) => {});
    
    let abortCbCalled = false;
    through(abortErr, (end: any) => {
      abortCbCalled = true;
      expect(end).toBeTruthy();
      done();
    });

    setTimeout(() => {
      // calls[0] = normal read, calls[1] = abort read
      // Resolve normal read -> map called -> busy=true, mapCbRef set
      calls[0].cb(null, 42);
      
      // busy is now true, mapCbRef is set
      // Resolve abort source callback
      calls[1].cb(abortErr);
      
      // In original: abort cb called unconditionally -> abortCbCalled=true -> done()
      // In mutated: if(busy) -> abortCb=cb -> abortCbCalled still false
      
      setTimeout(() => {
        if (!abortCbCalled) {
          // Force fail - mutated code path
          done(new Error("abort callback was never called"));
        }
      }, 100);
    }, 50);
  }, 500);
});