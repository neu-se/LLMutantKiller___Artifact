import { describe, it, expect } from "@jest/globals";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial application with multiple arguments", () => {
  it("should correctly handle partial sink with 4 through-stream arguments", (done) => {
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data * 2);
      });
    };

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data + 1);
      });
    };

    // Create a partial sink with 4 arguments (triggers the args array path)
    const pipeline = pull(double, addOne, double, addOne);

    // pipeline should be a function (partial application)
    expect(typeof pipeline).toBe("function");

    // Now complete the pipeline with a source
    const values = [1, 2, 3];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort || i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const read = pipeline(source);

    const results: number[] = [];
    const drain = (abort: any, cb: Function) => {};

    // Collect results manually
    function collect() {
      read(null, (end: any, data: any) => {
        if (end) {
          expect(results).toEqual([5, 7, 9]); // ((1*2)+1)*2+1=5, ((2*2)+1)*2+1=7, ((3*2)+1)*2+1=9
          done();
          return;
        }
        results.push(data);
        collect();
      });
    }
    collect();
  });
});