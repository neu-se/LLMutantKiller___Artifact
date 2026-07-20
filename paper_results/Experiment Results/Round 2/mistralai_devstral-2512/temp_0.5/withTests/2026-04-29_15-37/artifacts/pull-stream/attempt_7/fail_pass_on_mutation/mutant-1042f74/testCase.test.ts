const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe('drain mutation test', () => {
  it('should process all data items in synchronous stream', (done) => {
    const data = [1, 2, 3];
    const processed: number[] = [];

    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      if (processed.length >= data.length) return cb(true);
      cb(null, data[processed.length]);
    };

    pull(
      source,
      drain((d: number) => {
        processed.push(d);
        return true;
      }, (err: any) => {
        expect(err).toBeNull();
        expect(processed).toEqual(data);
        done();
      })
    );
  });
});