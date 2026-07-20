import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should read all data from a synchronous source and call done with null on completion", (done) => {
    const collected: number[] = [];
    
    // Create a synchronous pull-stream source that yields values 1, 2, 3 then ends
    const values = [1, 2, 3];
    let index = 0;
    
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) return cb(end, null);
      if (index >= values.length) {
        cb(true, null); // end of stream
      } else {
        cb(null, values[index++]);
      }
    }
    
    const sink = drain(
      (data: number) => {
        collected.push(data);
      },
      (err: any) => {
        expect(err).toBeNull();
        expect(collected).toEqual([1, 2, 3]);
        done();
      }
    );
    
    sink(source);
  });
});