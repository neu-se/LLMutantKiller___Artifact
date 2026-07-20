import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 2 through streams (case 2 in switch)", () => {
  it("should correctly pipe read through two through streams when used as a partial application", (done) => {
    // Create a simple source that emits values 1, 2, 3 then ends
    function source(end: any, cb: Function) {
      let i = 0;
      const values = [1, 2, 3];
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      // We need a stateful source
      source._i = source._i || 0;
      if (source._i >= values.length) return cb(true);
      cb(null, values[source._i++]);
    }
    source._i = 0;

    // Create a through stream that doubles values
    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    }

    // Create another through stream that adds 1
    function addOne(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data + 1);
        });
      };
    }

    const results: number[] = [];

    // Use pull as a partial application with 2 through streams (length === 2)
    // This tests case 2 in the switch statement
    const pipeline = pull(double, addOne);

    // pipeline should be a function that takes a read
    expect(typeof pipeline).toBe("function");

    // Apply the pipeline to the source
    const piped = pipeline(source);

    // Collect results
    function collect(end: any, cb: Function) {
      if (end === true) {
        // done collecting
        expect(results).toEqual([3, 5, 7]); // (1*2+1), (2*2+1), (3*2+1)
        done();
        return;
      }
      if (end) {
        done(end);
        return;
      }
      piped(null, function(end: any, data: any) {
        if (end === true) {
          expect(results).toEqual([3, 5, 7]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(data);
        collect(null, cb);
      });
    }

    piped(null, function(end: any, data: any) {
      if (end === true) {
        expect(results).toEqual([]);
        done();
        return;
      }
      if (end) {
        done(end);
        return;
      }
      results.push(data);

      piped(null, function(end: any, data: any) {
        if (end === true) {
          expect(results).toEqual([3]);
          done();
          return;
        }
        if (end) {
          done(end);
          return;
        }
        results.push(data);

        piped(null, function(end: any, data: any) {
          if (end === true) {
            expect(results).toEqual([3, 5]);
            done();
            return;
          }
          if (end) {
            done(end);
            return;
          }
          results.push(data);

          expect(results).toEqual([3, 5, 7]);
          done();
        });
      });
    });
  });
});