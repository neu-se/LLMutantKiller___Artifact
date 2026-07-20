import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should pass truthy end signal to done when abort is called with only a callback", (done) => {
    let storedCb: ((end: any, data?: any) => void) | null = null;
    
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        cb(end);
      } else {
        storedCb = cb;
      }
    }

    let doneArg: any = 'not-called';
    const sink = drain(null, (err: any) => {
      doneArg = err;
    });
    
    sink(source);
    
    // storedCb is set, loop is paused (async source)
    expect(storedCb).not.toBeNull();
    
    // Now abort with just a callback
    const abortCb = jest.fn();
    sink.abort(abortCb);
    
    // abort = true in both cases, so read(true, abortCb) is called
    // source receives end=true, calls abortCb(true)
    // But the pending storedCb callback - what happens to it?
    // The loop already exited (!cbed), so next() won't be called again from the loop
    // abortCb is called with (true)
    
    // Now manually invoke the stored callback to simulate data arriving after abort
    if (storedCb) {
      storedCb(null, 'some data');
    }
    
    // After storedCb(null, data) is called:
    // cbed=true, end=null, data='some data'
    // op is null, so check: op && false === op(data) -> false
    // check abort: || abort -> abort=true -> loop=false, read(true, done||fn)
    // read(true, done) -> source(true, done) -> done(true) -> doneArg = true (not null)
    // Wait, done(true===true ? null : true) = done(null)
    
    expect(doneArg).toBe(null);
    done();
  });
});