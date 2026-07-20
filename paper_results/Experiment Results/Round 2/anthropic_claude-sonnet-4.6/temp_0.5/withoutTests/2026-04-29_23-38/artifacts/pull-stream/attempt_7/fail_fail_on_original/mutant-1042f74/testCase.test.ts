import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("handles stream where first read is async and subsequent reads are sync", (done) => {
    let firstCallback: Function | null = null;
    let callCount = 0;
    const values = [1, 2];
    let valueIndex = 0;

    function source(end: any, cb: Function) {
      callCount++;
      if (end) { cb(end); return; }
      
      if (callCount === 1) {
        // First read is ASYNC
        firstCallback = () => cb(null, values[valueIndex++]);
      } else if (valueIndex < values.length) {
        // Subsequent reads are sync
        cb(null, values[valueIndex++]);
      } else {
        cb(true, null);
      }
    }

    const collected: number[] = [];
    const sink = drain(
      (data: number) => { collected.push(data); },
      (err: any) => {
        expect(err).toBeNull();
        expect(collected).toEqual([1, 2]);
        expect(callCount).toBe(4); // 1 async + 2 sync data + 1 end
        done();
      }
    );

    sink(source);
    
    // Trigger the first async callback
    firstCallback!();
  });
});