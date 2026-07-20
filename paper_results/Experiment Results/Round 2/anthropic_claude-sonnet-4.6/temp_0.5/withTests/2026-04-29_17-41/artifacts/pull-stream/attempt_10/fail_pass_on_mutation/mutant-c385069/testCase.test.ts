import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("abort callback is called when source is not busy", (done) => {
    const abortErr = new Error("abort");
    
    const calls: Array<[any, (end: any, data?: any) => void]> = [];

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      calls.push([abort, cb]);
    };

    const mapCalls: Array<(err: any, data?: any) => void> = [];
    
    const map = asyncMap((data: any, cb: (err: any, data?: any) => void) => {
      mapCalls.push(cb);
    });

    const through = map(source);

    through(null, (_end: any) => {});
    through(abortErr, (end: any) => {
      expect(end).toBeTruthy();
      done();
    });

    setTimeout(() => {
      // Log what we have
      const callAborts = calls.map(c => c[0]);
      
      // Find normal and abort source calls
      const normalCall = calls.find(c => !c[0]);
      const abortCall = calls.find(c => !!c[0]);
      
      expect(normalCall).toBeDefined();
      expect(abortCall).toBeDefined();
      
      // Resolve normal read first
      normalCall![1](null, 42);
      
      // If map was called (busy=true), resolve abort while busy
      if (mapCalls.length > 0) {
        abortCall![1](abortErr);
        // Original: done() called
        // Mutated: abortCb=cb, done() not called
      } else {
        // Map wasn't called - resolve abort directly
        abortCall![1](abortErr);
      }
    }, 50);
  }, 500);
});