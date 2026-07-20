import pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
import values = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js');
import find = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js');

describe('find sink', () => {
  it('should pass null error to callback when stream ends without finding a match', (done) => {
    // Use a custom source that explicitly ends with true
    function source(end: any, cb: Function) {
      if (end) return cb(end);
      cb(true); // immediately end with true (no data)
    }

    find(
      (d: any) => d === 99,
      (err: any, result: any) => {
        // Original: err===true ? null : err => null
        // Mutated:  false ? null : err => true
        expect(err).toBeNull();
        expect(result).toBeNull();
        done();
      }
    )(source);
  });
});