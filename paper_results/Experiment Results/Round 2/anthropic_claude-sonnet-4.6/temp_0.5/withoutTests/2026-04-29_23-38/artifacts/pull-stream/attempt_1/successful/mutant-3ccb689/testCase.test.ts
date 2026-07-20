import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort behavior", () => {
  it("should immediately call cb with abort error on subsequent reads after abort is set", (done) => {
    // Create a source that provides data but hangs on the second read
    let readCount = 0;
    let pendingCb: ((end: any, data?: any) => void) | null = null;
    
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      readCount++;
      if (readCount === 1) {
        // First read: provide data immediately
        cb(null, 1);
      } else {
        // Subsequent reads: hang (store callback)
        pendingCb = cb;
      }
    };

    // A slow async map that we can control
    let mapCb: ((err: any, data?: any) => void) | null = null;
    const slowMap = (data: any, cb: (err: any, data?: any) => void) => {
      mapCb = cb;
    };

    const through = asyncMap(slowMap);
    const stream = through(source);

    // First read: this will call source, get data=1, then call slowMap
    // slowMap will hang (mapCb is stored)
    stream(null, (end: any, data?: any) => {
      // This callback won't be called until mapCb is invoked
    });

    // At this point, map is busy (busy=true), mapCb is set
    // Now abort the stream - this sets aborted=abort
    const abortError = new Error("abort");
    stream(abortError, (err: any) => {
      // abort callback - stream is being aborted
      // Now complete the map operation
      if (mapCb) {
        mapCb(null, 42); // complete the map - this should trigger abortCb
      }
    });

    // Now aborted is set. Make another call to next.
    // In original: if(aborted) return cb(aborted) fires immediately
    // In mutated: the check is skipped, so it proceeds to read from source again
    
    let secondAbortCallbackCalled = false;
    let secondAbortError: any = null;
    
    // Give a tick for the abort to be processed
    setImmediate(() => {
      stream(null, (end: any, data?: any) => {
        secondAbortCallbackCalled = true;
        secondAbortError = end;
        
        // In original: end === abortError (immediate return)
        // In mutated: end might be something else or callback called differently
        expect(end).toBe(abortError);
        done();
      });
      
      // If the mutated version doesn't immediately call cb, 
      // it will try to read from source. We need to handle that.
      // Give a tick to see if the callback was called synchronously
      setImmediate(() => {
        if (!secondAbortCallbackCalled) {
          // Mutated version: callback wasn't called immediately
          // This means the mutation is present - force done with failure
          done(new Error("Expected cb to be called immediately with abort error, but it wasn't"));
        }
      });
    });
  });
});