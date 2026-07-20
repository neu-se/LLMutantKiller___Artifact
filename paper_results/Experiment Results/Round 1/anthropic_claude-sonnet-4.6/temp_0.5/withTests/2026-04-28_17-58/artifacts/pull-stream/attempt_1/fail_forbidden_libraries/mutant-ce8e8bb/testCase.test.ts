import { describe, it, expect } from "@jest/globals";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with object-style through stream", () => {
  it("should correctly handle an object stream with sink and source properties", (done) => {
    // Create a simple object-style through stream (has both sink and source)
    function makeObjectThrough() {
      let _read: Function;
      const through = {
        sink: function(read: Function) {
          _read = read;
        },
        source: function(abort: any, cb: Function) {
          _read(abort, function(end: any, data: any) {
            if (end) return cb(end);
            cb(null, data * 2);
          });
        }
      };
      return through;
    }

    const results: number[] = [];
    let ended = false;

    const source = function(abort: any, cb: Function) {
      const values = [1, 2, 3];
      let i = 0;
      return function(abort: any, cb: Function) {
        if (abort || i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
    }();

    const objectThrough = makeObjectThrough();

    // In original: object through is handled by the else-if branch (sink/source)
    // In mutated: tries to call objectThrough as a function -> TypeError
    expect(() => {
      const read = pull(source, objectThrough);
      
      function drain(abort: any, cb: Function) {
        read(null, function next(end: any, data: any) {
          if (end) {
            ended = true;
            done();
            return;
          }
          results.push(data);
          read(null, next);
        });
      }
      
      drain(null, () => {});
    }).not.toThrow();
  });
});