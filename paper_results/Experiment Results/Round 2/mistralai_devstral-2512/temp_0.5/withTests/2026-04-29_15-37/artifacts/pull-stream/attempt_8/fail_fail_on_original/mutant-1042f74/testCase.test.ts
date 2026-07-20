const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should detect mutation by testing synchronous callback behavior', (done) => {
    const data = [1, 2, 3];
    let readCalls = 0;
    let callbackCount = 0;

    const source = (abort: any, cb: any) => {
      readCalls++;
      if (abort) return cb(abort);
      if (callbackCount >= data.length) return cb(true);

      callbackCount++;
      cb(null, data[callbackCount - 1]);
    };

    pull(
      source,
      drain((d: number) => {
        return true;
      }, (err: any) => {
        expect(err).toBeNull();
        // The mutation changes cbed initialization from false to true
        // This affects the loop behavior in the drain function
        // Original code should make exactly 3 read calls for 3 items
        // Mutated code may make fewer read calls
        expect(readCalls).toBe(3);
        expect(callbackCount).toBe(3);
        done();
      })
    );
  });
});