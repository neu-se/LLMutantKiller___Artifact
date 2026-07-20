import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("sink.abort stops reading", (done) => {
    const received: number[] = [];
    let readCount = 0;
    
    function source(end: any, cb: (err: any, data?: any) => void) {
      readCount++;
      if (end) { cb(end); return; }
      setImmediate(() => cb(null, readCount));
    }
    
    const sink = drain(
      (x: number) => { received.push(x); },
      (err: any) => {
        expect(received.length).toBeGreaterThan(0);
        done();
      }
    );
    
    sink(source);
    
    setImmediate(() => {
      sink.abort();
    });
  });
});