import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should call done exactly once when stream ends synchronously", () => {
    let doneCount = 0;
    const collected: number[] = [];
    
    // Synchronous source: yields 1, then ends
    let index = 0;
    const data = [1];
    
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) { cb(end, null); return; }
      if (index >= data.length) {
        cb(true, null);
      } else {
        cb(null, data[index++]);
      }
    }
    
    const sink = drain(
      (item: number) => { collected.push(item); },
      (err: any) => { doneCount++; }
    );
    
    sink(source);
    
    expect(doneCount).toBe(1);
    expect(collected).toEqual([1]);
  });
});