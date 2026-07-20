import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should pass a truthy abort signal to source when op returns false", (done) => {
    let i = 0;
    const values = [1, 2, 3, 4, 5];
    let abortSignal: any = undefined;
    let callsAfterAbort = 0;
    
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        abortSignal = end;
        cb(end); // pass the end signal back - if end is falsy, this won't trigger done
        return;
      }
      if (i >= values.length) {
        cb(true);
        return;
      }
      cb(null, values[i++]);
    }
    
    // op returns false on first item
    const op = (_data: any) => false;
    
    const doneCallback = jest.fn((err: any) => {
      // With original: source receives true, calls cb(true), done gets true -> done(true === true ? null : true) = done(null)
      // Wait, done is passed directly to read(), not wrapped
      done();
    });
    
    const sink = drain(op, doneCallback);
    sink(source);
    
    setTimeout(() => {
      expect(abortSignal).toBeTruthy();
      done();
    }, 50);
  });
});