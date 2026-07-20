import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce", () => {
  it("should handle errors from source stream by passing them to callback", (done) => {
    const error = new Error("stream error");
    let callCount = 0;
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      callCount++;
      if (callCount === 1) cb(null, 42);
      else cb(error);
    };

    const sink = reduce(
      (acc: number, x: number) => acc + x,
      0,
      (err: any, result: number) => {
        expect(err).toBe(error);
        done();
      }
    );

    sink(source);
  });
});