const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should process synchronous data correctly', (done) => {
    const data = [1, 2, 3];
    let processedCount = 0;

    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      if (processedCount >= data.length) return cb(true);
      cb(null, data[processedCount++]);
    };

    pull(
      source,
      drain((d: number) => {
        return true;
      }, (err: any) => {
        expect(err).toBeNull();
        expect(processedCount).toBe(data.length);
        done();
      })
    );
  });
});