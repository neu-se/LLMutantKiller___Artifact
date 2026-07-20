const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const through = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js");

describe('through onEnd behavior with true abort', () => {
  it('should pass null to onEnd when abort is true', (done) => {
    let onEndValue: any;
    const onEnd = (value: any) => {
      onEndValue = value;
    };

    // Create a simple source that we can abort
    const source = (abort: any, cb: any) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, 1);
      }
    };

    const throughStream = through(null, onEnd);
    const read = pull(source, throughStream, pull.drain());

    // First read normally
    read(null, () => {
      // Then abort with true
      read(true, () => {
        setImmediate(() => {
          // Original code: abort === true ? null : abort → null
          // Mutated code: abort === false ? null : abort → true
          expect(onEndValue).toBeNull();
          done();
        });
      });
    });
  });
});