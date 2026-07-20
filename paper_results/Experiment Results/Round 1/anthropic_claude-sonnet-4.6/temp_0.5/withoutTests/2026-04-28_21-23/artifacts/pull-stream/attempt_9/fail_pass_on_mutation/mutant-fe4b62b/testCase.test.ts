import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should set abort to truthy value so stream terminates when abort called with callback before source connected", (done) => {
    const endValues: any[] = [];
    
    // Synchronous source
    function source(end: any, cb: (end: any, data?: any) => void) {
      endValues.push(end);
      if (end) {
        cb(end);
      } else {
        cb(null, 'data');
      }
    }
    
    const doneMock = jest.fn();
    const sink = drain((_data: any) => true, doneMock);
    
    // Abort before connecting - abort variable set, read is null
    const abortFn = jest.fn();
    sink.abort(abortFn);
    
    // Connect source - if(abort) return sink.abort()
    // This calls sink.abort() with no args -> abort = undefined||true = true
    // read(true, ()=>{}) -> source(true, ()=>{}) -> ()=>{}(true)
    sink(source);
    
    // If abort was false (hypothetically), if(abort) would be false,
    // and the loop would run, calling source(null, cb) -> cb(null, 'data')
    // op returns true (not false), so loop continues -> infinite loop!
    // But since abort=true in both cases, this doesn't happen
    
    expect(endValues).toContain(true);
    done();
  });
});