import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce", () => {
  it("should call callback with null error and initial accumulator when source immediately ends", (done) => {
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      cb(true); // immediately end
    };
    
    reduce((acc: number, x: number) => acc + x, 0, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(0);
      done();
    })(source);
  });
});