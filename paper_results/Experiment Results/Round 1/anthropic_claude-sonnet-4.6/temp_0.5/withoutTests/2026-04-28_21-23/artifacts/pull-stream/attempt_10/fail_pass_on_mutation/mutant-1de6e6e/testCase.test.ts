import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce sink", () => {
  it("should propagate stream end error to callback", (done) => {
    const streamError = new Error("stream failed");
    let readCount = 0;

    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      readCount++;
      if (readCount === 1) {
        cb(null, 10); // first value
      } else {
        cb(streamError); // error on second read
      }
    };

    reduce(
      (acc: number, data: number) => acc + data,
      0,
      (err: any, result: any) => {
        expect(err).toBe(streamError);
        done();
      }
    )(source);
  });
});