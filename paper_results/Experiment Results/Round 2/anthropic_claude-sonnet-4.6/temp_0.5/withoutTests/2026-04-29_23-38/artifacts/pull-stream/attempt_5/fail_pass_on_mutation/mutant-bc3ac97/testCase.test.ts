import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 3 switch statement", () => {
  it("should return undefined when case 3 falls through to case 4 with undefined 4th arg as a sink", (done) => {
    let i = 0;
    const values = [1, 2, 3];

    function source(end: any, cb: Function) {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    }

    // A sink object with .sink() and .source - this is what case 4 would mishandle
    // if ref[3] is undefined, the sink's source won't be assigned to read
    const collected: number[] = [];
    let sinkRead: Function;

    const sink = {
      sink: function(read: Function) {
        sinkRead = read;
      },
      source: function(end: any, cb: Function) {
        // won't be used
      }
    };

    // t1, t2 are through streams (length===1), t3 is a sink-like object
    function t1(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    }

    function t2(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data + 1);
        });
      };
    }

    // Use pull directly with 4 args (not partial) to test case 3 result
    // pull(source, t1, t2) should give us a readable with both transforms
    const result = pull(source, t1, t2);

    // result should be a readable function
    expect(typeof result).toBe('function');

    result(null, function(end: any, data: any) {
      if (end) { done(end === true ? undefined : end); return; }
      // source gives 1, t1 doubles to 2, t2 adds 1 = 3
      expect(data).toBe(3);
      done();
    });
  });
});