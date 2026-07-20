import pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
import values = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js');
import find = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js');
import drainModule = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js');

describe('find sink', () => {
  it('detects mutation by checking what drain passes to end callback', (done) => {
    // Intercept what drain receives - use a source that ends with error=true
    // and verify find translates it to null
    
    // Use pull.error which ends stream with an actual Error object
    // With actual error: original passes err, mutated also passes err - same
    // With err===true: original passes null, mutated passes true - different!
    
    // Let's use pull.empty() which ends with true
    const emptySource = pull.empty();
    
    find(
      (d: any) => true,
      (err: any, result: any) => {
        // empty source ends with true immediately
        // Original: err===true ? null : err => null  
        // Mutated:  false ? null : err => true
        expect(err).toBeNull();
        done();
      }
    )(emptySource);
  });
});