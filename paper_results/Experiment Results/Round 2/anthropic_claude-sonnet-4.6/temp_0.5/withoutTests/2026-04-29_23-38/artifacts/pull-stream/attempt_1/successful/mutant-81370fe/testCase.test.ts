import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with through stream objects", () => {
  it("should correctly pipe through a duplex stream object with sink and source properties", (done) => {
    const results: number[] = [];
    
    // Create a simple source that emits values 1, 2, 3
    function source(end: boolean | null, cb: (end: boolean | null, data?: number) => void) {
      let i = 0;
      const values = [1, 2, 3];
      return function read(end: boolean | null, cb: (end: boolean | null, data?: number) => void) {
        if (end) return cb(end);
        if (i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
    }
    
    // Create a through stream as an object with sink and source
    function createThrough(transform: (x: number) => number) {
      let _read: Function;
      
      const through = {
        sink: function(read: Function) {
          _read = read;
        },
        source: function(end: boolean | null, cb: (end: boolean | null, data?: number) => void) {
          _read(end, function(end: boolean | null, data?: number) {
            if (end) return cb(end);
            cb(null, transform(data!));
          });
        }
      };
      
      return through;
    }
    
    // Create a sink that collects results
    function sink(read: Function) {
      function next() {
        read(null, function(end: boolean | null, data?: number) {
          if (end === true) {
            // Verify results
            expect(results).toEqual([2, 4, 6]);
            done();
            return;
          }
          if (end) {
            done(end);
            return;
          }
          results.push(data!);
          next();
        });
      }
      next();
    }
    
    // Create source stream
    const sourceStream = (function() {
      let i = 0;
      const values = [1, 2, 3];
      return function(end: boolean | null, cb: (end: boolean | null, data?: number) => void) {
        if (end) return cb(end);
        if (i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
    })();
    
    // Create a through object that doubles values
    const doubler = createThrough((x) => x * 2);
    
    // Use pull with the through object - this should work with original code
    // but fail with mutated code since the else if (s && typeof s === 'object') branch is disabled
    const result = pull(sourceStream, doubler);
    sink(result);
  });
});