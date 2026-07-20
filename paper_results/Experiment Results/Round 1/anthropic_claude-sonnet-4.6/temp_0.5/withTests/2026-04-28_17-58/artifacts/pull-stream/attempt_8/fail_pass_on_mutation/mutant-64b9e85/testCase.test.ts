const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find', () => {
  it('should pass null error to callback when stream ends normally with no match, verifying err===true normalization', (done) => {
    // Create a source that ends with `true` directly
    let count = 0;
    const source = function(abort: any, cb: Function) {
      if (abort) return cb(abort);
      count++;
      if (count > 3) return cb(true); // end with true
      cb(null, count);
    };
    
    const sink = find(function (d: any) {
      return d === 999; // never matches
    }, function (err: any, found: any) {
      // Original: err===true becomes null; Mutated: false?null:err = err (true)
      expect(err).toBeNull();
      expect(found).toBeNull();
      done();
    });
    
    sink(source);
  });
});