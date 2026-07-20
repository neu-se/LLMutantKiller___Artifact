import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2 mutation with source object", () => {
  it("should handle source object correctly in length=2 partial application", (done) => {
    let i = 0;
    
    const sourceObj = {
      source: function(end: any, cb: Function) {
        if (end) return cb(end);
        if (i++ > 0) return cb(true);
        cb(null, 7);
      }
    };

    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    }

    function addFive(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end);
          cb(null, data + 5);
        });
      };
    }

    // length=2 partial, applied to sourceObj
    // sourceObj.source is a function, so read = sourceObj.source
    // Original case 2: pull(sourceObj.source, double, addFive)
    // Mutated default: ref.unshift(sourceObj.source); pull(sourceObj.source, double, addFive)
    // Same!
    
    const pipeline = pull(double, addFive);
    const piped = pipeline(sourceObj as any);
    
    piped(null, function(end: any, data: any) {
      if (end) { done(end === true ? undefined : end); return; }
      expect(data).toBe(7 * 2 + 5); // 19
      done();
    });
  });
});