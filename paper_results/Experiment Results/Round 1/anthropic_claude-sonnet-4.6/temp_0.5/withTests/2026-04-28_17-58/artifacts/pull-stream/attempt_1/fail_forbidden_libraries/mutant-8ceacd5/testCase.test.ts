import { describe, it, expect } from "@jest/globals";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with more than 4 arguments as partial sink", () => {
  it("should correctly handle 5 through-streams via the default case in the switch", (done) => {
    // Create a partial pipeline with 5 through-stream functions (triggers default case)
    // When pull is called with a single function of arity 1, it returns a partial sink
    // The switch handles cases 1-4 explicitly; 5+ falls to default
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

    // Build a partial pipeline with 5 through functions (length === 5)
    // This triggers the default case in the switch statement
    const partialPipeline = pull(double, addOne, double, addOne, double);

    // partialPipeline should be a function that accepts a read source
    expect(typeof partialPipeline).toBe("function");

    // Create a simple source
    const values = [1, 2, 3];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Apply the partial pipeline to the source
    const read = partialPipeline(source);

    // read should be a function (not undefined)
    expect(typeof read).toBe("function");

    // Collect results
    const results: number[] = [];
    const next = (end: any, data: any) => {
      if (end === true) {
        // Expected: each value goes through double, addOne, double, addOne, double
        // 1 -> *2=2 -> +1=3 -> *2=6 -> +1=7 -> *2=14
        // 2 -> *2=4 -> +1=5 -> *2=10 -> +1=11 -> *2=22
        // 3 -> *2=6 -> +1=7 -> *2=14 -> +1=15 -> *2=30
        expect(results).toEqual([14, 22, 30]);
        done();
        return;
      }
      if (end) {
        done(end);
        return;
      }
      results.push(data);
      read(null, next);
    };

    read(null, next);
  });
});