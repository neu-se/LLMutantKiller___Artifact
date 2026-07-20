import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application with multiple arguments", () => {
  it("should correctly apply partial sink with multiple through streams", () => {
    // Create a simple source that emits values 1, 2, 3 then ends
    function source(end: any, cb: Function) {
      let i = 0;
      const values = [1, 2, 3];
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      // We need a stateful source
    }

    // Use a values source
    function values(arr: number[]) {
      let i = 0;
      return function(end: any, cb: Function) {
        if (end) return cb(end);
        if (i >= arr.length) return cb(true);
        cb(null, arr[i++]);
      };
    }

    // A through stream that doubles values
    function double() {
      return function(read: Function) {
        return function(end: any, cb: Function) {
          read(end, function(end: any, data: any) {
            if (end) return cb(end);
            cb(null, data * 2);
          });
        };
      };
    }

    // A through stream that adds 1
    function addOne() {
      return function(read: Function) {
        return function(end: any, cb: Function) {
          read(end, function(end: any, data: any) {
            if (end) return cb(end);
            cb(null, data + 1);
          });
        };
      };
    }

    // Create a partial pipeline with 2 through streams (length === 2 arguments)
    // This triggers the partial application path since a.length === 1 (through streams have length 1)
    const partialPipeline = pull(double(), addOne());

    // partialPipeline should be a function that accepts a read
    expect(typeof partialPipeline).toBe("function");

    // Now apply it to a source
    const resultStream = partialPipeline(values([1, 2, 3]));

    // Collect results
    const results: number[] = [];
    function collect(read: Function) {
      function next() {
        read(null, function(end: any, data: any) {
          if (end === true) return;
          if (end) throw end;
          results.push(data);
          next();
        });
      }
      next();
    }

    collect(resultStream);

    // 1*2+1=3, 2*2+1=5, 3*2+1=7
    expect(results).toEqual([3, 5, 7]);
  });
});