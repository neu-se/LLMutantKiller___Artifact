import { describe, it, expect } from "@jest/globals";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial sink", () => {
  it("should correctly collect values when using a partial sink with multiple throughs", (done) => {
    // Create a map through that doubles values
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) cb(end);
        else cb(null, data * 2);
      });
    };

    // Create a collect sink
    const collectSink = (onDone: Function) => (read: Function) => {
      const results: number[] = [];
      const next = () => {
        read(null, (end: any, data: any) => {
          if (end === true) {
            onDone(null, results);
            return;
          }
          if (end) {
            onDone(end);
            return;
          }
          results.push(data);
          next();
        });
      };
      next();
    };

    // Create a partial sink using pull with a through and a sink
    // The first argument is a function with length === 1 (a through stream)
    const partialSink = pull(double, collectSink((err: any, results: number[]) => {
      expect(err).toBeNull();
      expect(results).toEqual([2, 4, 6]);
      done();
    }));

    // partialSink should be a function that accepts a read
    expect(typeof partialSink).toBe("function");
    expect(partialSink.length).toBe(1);

    // Create a source of values [1, 2, 3]
    const values = [1, 2, 3];
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) { cb(abort); return; }
      if (i >= values.length) { cb(true); return; }
      cb(null, values[i++]);
    };

    // Connect the source to the partial sink
    partialSink(source);
  });
});