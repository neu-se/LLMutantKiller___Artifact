import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should call callback with initial accumulator for empty stream without calling reducer", (done) => {
    // Empty stream
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      cb(true); // immediately end
    };

    const reducerCalls: any[] = [];
    
    reduce(
      (acc: any, data: any) => { reducerCalls.push(data); return data; },
      42,
      (err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toBe(42); // initial acc unchanged since no data
        expect(reducerCalls.length).toBe(0); // reducer never called
        done();
      }
    )(source);
  });
});