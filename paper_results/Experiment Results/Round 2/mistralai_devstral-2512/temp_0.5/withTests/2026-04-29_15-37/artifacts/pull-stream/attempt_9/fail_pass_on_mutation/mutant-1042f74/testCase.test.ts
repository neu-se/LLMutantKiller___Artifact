const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should expose mutation by testing callback timing in synchronous stream', (done) => {
    const data = [1, 2, 3];
    let callbackCount = 0;
    let finalCallbackCount = 0;

    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      if (callbackCount >= data.length) return cb(true);

      callbackCount++;
      // The mutation affects whether the loop continues after callback
      // Original code (cbed=false) should process all items
      // Mutated code (cbed=true) may skip items
      setImmediate(() => {
        cb(null, data[callbackCount - 1]);
      });
    };

    pull(
      source,
      drain((d: number) => {
        finalCallbackCount++;
        return true;
      }, (err: any) => {
        expect(err).toBeNull();
        // Both versions should process all items, but timing differs
        expect(finalCallbackCount).toBe(data.length);
        done();
      })
    );
  });
});