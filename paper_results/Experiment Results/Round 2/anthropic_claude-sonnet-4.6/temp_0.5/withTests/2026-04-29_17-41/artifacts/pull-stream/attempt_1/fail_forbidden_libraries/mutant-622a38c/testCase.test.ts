import { describe, it, expect } from "@jest/globals";
import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";

describe("reduce without initial value on empty stream", () => {
  it("should call callback with null error when source ends immediately with no data", (done) => {
    // Source that ends immediately (no data)
    const emptySource = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // end immediately
    };

    const reducer = (acc: any, data: any) => acc + data;

    const sink = reduce(reducer, (err: any, val: any) => {
      // Original: cb(null) because end === true -> null
      // Mutated: cb(true) because false ? null : end -> end (which is true)
      expect(err).toBeNull();
      done();
    });

    // When called with 2 args, reduce returns a function that accepts a source
    sink(emptySource);
  });
});