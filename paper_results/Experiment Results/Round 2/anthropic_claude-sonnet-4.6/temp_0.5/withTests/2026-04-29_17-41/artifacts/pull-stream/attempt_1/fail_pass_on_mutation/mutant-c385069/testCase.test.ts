import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap abort when not busy", () => {
  it("should call abort callback when stream is not busy during abort", (done) => {
    const err = new Error("abort");
    
    // Create a source that hangs (never calls cb) after first value
    let sourceCb: ((end: any, data?: any) => void) | null = null;
    let sourceCallCount = 0;
    
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      sourceCallCount++;
      if (abort) {
        cb(abort);
        return;
      }
      // First call: return a value
      if (sourceCallCount === 1) {
        cb(null, 42);
      } else {
        // Hang - save cb but don't call it
        sourceCb = cb;
      }
    };
    
    const map = asyncMap((data: any, cb: (err: any, data?: any) => void) => {
      // Synchronous map - completes immediately, so stream is not busy after
      cb(null, data);
    });
    
    const through = map(source);
    
    // First read: get a value (map completes synchronously, so not busy after)
    through(null, (end: any, data: any) => {
      if (end) return done(new Error("unexpected end on first read"));
      
      // Now the stream is NOT busy. Abort it.
      // With the mutation, if(!busy) branch becomes if(false), 
      // so the abort callback would never be called.
      through(err, (abortEnd: any) => {
        expect(abortEnd).toBeTruthy();
        done();
      });
    });
  });
});