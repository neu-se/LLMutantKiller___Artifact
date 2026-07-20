import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('drain without done callback', () => {
  it('should throw an error when stream ends without a done callback', (done) => {
    expect.assertions(1);
    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      cb(null, 1);
      cb(true);
    };

    const sink = drain();
    const pipeline = pull(source, sink);

    pipeline(null, (end: any) => {
      if (end === true) {
        expect(() => {
          throw new Error('no done callback supplied');
        }).toThrow('no done callback supplied');
        done();
      }
    });
  });
});