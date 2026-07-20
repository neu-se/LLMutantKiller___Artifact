import { describe, it, expect } from "@jest/globals";
import filter from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js";

describe("filter through", () => {
  it("should handle filtering many items synchronously without stack overflow", (done) => {
    // Create a source that synchronously provides many values
    const TOTAL = 10000;
    const values = Array.from({ length: TOTAL }, (_, i) => i);
    let index = 0;

    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      if (index >= values.length) {
        cb(true);
        return;
      }
      cb(null, values[index++]);
    };

    // Filter that only passes even numbers (filters out half = 5000 items synchronously)
    const filterThrough = filter((x: number) => x === TOTAL - 1); // only pass the last item

    const read = filterThrough(source);

    const results: number[] = [];

    const drain = (end: any, data?: any) => {
      if (end === true) {
        expect(results).toEqual([TOTAL - 1]);
        done();
        return;
      }
      if (end) {
        done(end);
        return;
      }
      results.push(data);
      read(null, drain);
    };

    // Should not throw stack overflow
    expect(() => {
      read(null, drain);
    }).not.toThrow();
  });
});