import { describe, it, expect } from "@jest/globals";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with object-style through stream", () => {
  it("should correctly pipe through an object stream with sink and source properties", (done) => {
    // Create an object-style through stream (duplex) with sink and source properties
    // This tests the `else if (s && typeof s === 'object')` branch
    const results: number[] = [];
    
    // Create a simple object-style through stream that doubles values
    function createObjectThrough() {
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
    
    // Create a simple source
    const values = [1, 2, 3];
    let i = 0;
    const source = function(abort: any, cb: Function) {
      if (abort) return cb(abort);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };
    
    // Create a simple sink/drain
    const sink = function(read: Function) {
      read(null, function next(end: any, data: any) {
        if (end) {
          // Check results
          expect(results).toEqual([2, 4, 6]);
          done();
          return;
        }
        results.push(data);
        read(null, next);
      });
    };
    
    const objectThrough = createObjectThrough();
    
    // Use pull with an object-style through stream
    pull(source, objectThrough, sink);
  });
});