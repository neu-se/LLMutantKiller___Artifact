const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should detect mutation by testing callback behavior with synchronous source', (done) => {
    const data = [1, 2, 3];
    let readCount = 0;
    let callbackInvoked = false;

    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      if (readCount >= data.length) return cb(true);

      // This will expose the mutation because the original code
      // sets cbed = false initially, while the mutant sets cbed = true
      // which affects whether the loop continues
      readCount++;
      callbackInvoked = true;
      cb(null, data[readCount - 1]);
    };

    pull(
      source,
      drain((d: number) => {
        return true;
      }, (err: any) => {
        expect(err).toBeNull();
        expect(readCount).toBe(data.length);
        expect(callbackInvoked).toBe(true);
        done();
      })
    );
  });
});