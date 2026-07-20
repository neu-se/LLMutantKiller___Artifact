import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call read with abort when op returns false and abort is true', (done) => {
    let readCalled = false;
    const readSpy = jest.fn((err, cb) => {
      if (err === true) {
        readCalled = true;
      }
      cb(null, null);
    });
    const opSpy = jest.fn(() => false);
    const sink = drainModule.default(opSpy, () => {
      if (readCalled) {
        done();
      } else {
        done(new Error('Expected read to be called with abort'));
      }
    });
    sink(readSpy);
    sink.abort(true);
  });
});