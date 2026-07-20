import { describe, it, expect } from "@jest/globals";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial sink with multiple arguments", () => {
  it("should correctly pipe values through a partial pipeline created with multiple through functions", (done) => {
    const results: number[] = [];

    // Create a partial sink with 4 through functions (hits case 4 in switch)
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end);
        cb(null, data * 2);
      });
    };

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: number) => {
        if (end) return cb(end);
        cb(null, data + 1);
      });
    };

    // Create a partial pipeline with exactly 4 arguments (length=4, hits case 4)
    const pipeline = pull(double, addOne, double, addOne);

    // pipeline should be a function (partial sink)
    expect(typeof pipeline).toBe("function");
    expect(pipeline.length).toBe(1);

    // Now use it with a source
    const source = (function() {
      let i = 0;
      const arr = [1, 2, 3];
      return (abort: any, cb: Function) => {
        if (abort || i >= arr.length) return cb(true);
        cb(null, arr[i++]);
      };
    })();

    const read = pipeline(source);

    // Collect results
    function collect(end: any, data: number) {
      if (end) {
        expect(results).toEqual([7, 11, 15]); // ((1*2+1)*2+1)=7, ((2*2+1)*2+1)=11, ((3*2+1)*2+1)=15
        done();
        return;
      }
      results.push(data);
      read(null, collect);
    }

    read(null, collect);
  });
});