import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce", () => {
  it("should pass error from drain to callback without accumulator", (done) => {
    const expectedError = new Error("test error");
    let calls = 0;
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      calls++;
      if (calls === 1) return cb(null, 1);
      return cb(expectedError);
    };
    reduce(
      (acc: number, x: number) => acc + x,
      0,
      (err: any, result: any) => {
        expect(err).toBe(expectedError);
        expect(result).toBe(1);
        done();
      }
    )(source);
  });
});