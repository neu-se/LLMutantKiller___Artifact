import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial sink", () => {
  it("should correctly handle partial pipeline with multiple through functions and produce correct results", (done) => {
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end);
        cb(null, data * 2);
      });
    };

    const pipeline = pull(double, double, double, double, double);

    let i = 0;
    const arr = [1];
    const source = (abort: any, cb: Function) => {
      if (abort || i >= arr.length) return cb(true);
      cb(null, arr[i++]);
    };

    const read = pipeline(source);
    read(null, (end: any, data: number) => {
      expect(data).toBe(32); // 1 * 2^5
      done();
    });
  });
});