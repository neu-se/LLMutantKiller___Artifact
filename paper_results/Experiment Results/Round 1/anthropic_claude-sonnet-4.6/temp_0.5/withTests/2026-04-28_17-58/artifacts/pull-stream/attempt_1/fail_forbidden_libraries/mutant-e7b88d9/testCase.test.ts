import { describe, it, expect } from "@jest/globals";
import take from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/take.js";

describe("take - end signal propagation", () => {
  it("should call callback with ended=true when source ends naturally during take", (done) => {
    // Create a finite source that yields 2 items then ends
    let i = 0;
    const values = [1, 2];
    function source(end: any, cb: Function) {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    }

    // take with a test that always returns true (never stops early)
    // so the source will naturally end before take stops it
    const through = take(Boolean);
    const read = through(source);

    const results: number[] = [];

    function drain(end: any, data: any) {
      if (end === true) {
        // Stream ended normally - this is what we expect
        expect(results).toEqual([1, 2]);
        done();
        return;
      }
      if (end) {
        done(end);
        return;
      }
      results.push(data);
      read(null, drain);
    }

    read(null, drain);
  });
});