import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should pass abort error (not true) to read when abort is set and op returns false", (done) => {
    const specificAbortError = new Error("specific abort error");
    let secondReadArg: any = undefined;
    let dataProvided = false;

    const source = (end: any, cb: Function) => {
      if (!dataProvided && end === null) {
        dataProvided = true;
        cb(null, "somedata");
      } else {
        secondReadArg = end;
        cb(end || true, null);
      }
    };

    let sinkInstance: any;
    
    const op = (data: any) => {
      // Set abort to specific error, then return false
      sinkInstance.abort(specificAbortError);
      return false;
    };

    sinkInstance = drain(op, (err: any) => {
      try {
        expect(secondReadArg).toBe(specificAbortError);
        done();
      } catch (e) {
        done(e);
      }
    });

    sinkInstance(source);
  });
});