import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call read with abort when op returns false and abort is set to true', (done) => {
    const readSpy = jest.fn((err, cb) => {
      if (err === true) {
        done();
      } else {
        done(new Error('Expected read to be called with abort'));
      }
    });
    const opSpy = jest.fn(() => false);
    const sink = drainModule.default(opSpy, () => {});
    sink(readSpy);
    sink.abort(true);
  });
});