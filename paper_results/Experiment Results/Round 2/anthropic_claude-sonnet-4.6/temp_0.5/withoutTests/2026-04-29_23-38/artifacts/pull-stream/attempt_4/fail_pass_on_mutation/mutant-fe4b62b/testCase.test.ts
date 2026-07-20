import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should invoke read with true when abort is called with no arguments", (done) => {
    const receivedEnds: any[] = [];
    let readCb: ((end: any, data?: any) => void) | null = null;

    const source = (end: any, cb: (end: any, data?: any) => void) => {
      receivedEnds.push(end);
      if (end) {
        cb(end);
        return;
      }
      readCb = cb;
    };

    const sink = drain(
      (data: any) => {},
      (err: any) => {
        // abort=true means end===true means done(null)
        expect(err).toBeNull();
        // Verify read was called with true (not false)
        expect(receivedEnds).toContain(true);
        done();
      }
    );

    sink(source);

    const cb = readCb!;
    readCb = null;
    
    sink.abort();
    
    // source should have been called with abort value
    if (readCb) {
      readCb(true);
    } else {
      cb(true);
    }
  });
});