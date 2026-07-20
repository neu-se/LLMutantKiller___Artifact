import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("abort before sink receives read function should work correctly", () => {
    let readCalled = false;
    let abortValue: any = null;
    
    function source(end: any, cb: Function) {
      readCalled = true;
      abortValue = end;
      cb(end || true);
    }
    
    const sink = drain(
      (_data: any) => {},
      (_err: any) => {}
    );
    
    // Abort before connecting source
    sink.abort(new Error("early abort"));
    
    // Now connect source - should immediately abort
    sink(source);
    
    expect(readCalled).toBe(true);
    expect(abortValue).toBeInstanceOf(Error);
    expect(abortValue.message).toBe("early abort");
  });
});