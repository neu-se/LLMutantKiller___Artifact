import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should call done callback exactly once when op returns false", () => {
    let doneCount = 0;
    let abortReceived = false;
    
    function source(end: any, cb: Function) {
      if (end) {
        abortReceived = true;
        cb(end);
        return;
      }
      cb(null, 1); // always sync data
    }
    
    const sink = drain(
      (_data: number) => false, // immediately abort
      (_err: any) => { doneCount++; }
    );
    
    sink(source);
    
    expect(doneCount).toBe(1);
    expect(abortReceived).toBe(true);
  });
});