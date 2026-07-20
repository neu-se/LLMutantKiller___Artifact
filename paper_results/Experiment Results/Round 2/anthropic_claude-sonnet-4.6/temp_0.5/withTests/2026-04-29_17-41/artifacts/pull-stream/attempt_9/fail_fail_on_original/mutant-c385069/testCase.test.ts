import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("abort callback called correctly when busy at time of abort source ack", (done) => {
    const abortErr = new Error("abort");
    
    let normalSourceCb: ((end: any, data?: any) => void) | null = null;
    let abortSourceCb: ((end: any, data?: any) => void) | null = null;
    let mapCb: ((err: any, data?: any) => void) | null = null;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) abortSourceCb = cb;
      else normalSourceCb = cb;
    };

    const map = asyncMap((data: any, cb: (err: any, data?: any) => void) => {
      mapCb = cb;
    });

    const through = map(source);

    through(null, (_end: any, _data: any) => {});

    through(abortErr, (end: any) => {
      expect(end).toBeTruthy();
      done();
    });

    // Now manually control the sequence:
    // 1. Resolve normal read -> map called -> busy=true
    // 2. Resolve abort source -> 
    //    original: cb(abort) unconditional
    //    mutated: if(busy) abortCb=cb -> never called
    // 3. (mutated only) map completes -> but aborted not set -> abortCb never called

    setTimeout(() => {
      expect(normalSourceCb).not.toBeNull();
      expect(abortSourceCb).not.toBeNull();
      
      // Step 1: resolve normal read -> map invoked -> busy=true
      normalSourceCb!(null, 42);
      expect(mapCb).not.toBeNull(); // map was called
      
      // Step 2: resolve abort source while busy=true
      abortSourceCb!(abortErr);
      // Original: done() called here
      // Mutated: abortCb=cb, done() NOT called
      
      // Step 3: complete map (won't help in mutated since aborted is never set)
      // Don't call mapCb - let test timeout on mutated
    }, 50);
  }, 500);
});