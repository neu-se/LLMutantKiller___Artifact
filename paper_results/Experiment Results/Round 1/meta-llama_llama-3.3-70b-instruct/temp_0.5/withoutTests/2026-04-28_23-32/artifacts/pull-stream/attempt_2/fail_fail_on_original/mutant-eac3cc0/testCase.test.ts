import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with error when op returns false and abort is set to true', (done) => {
    const readSpy = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    const doneSpy = jest.fn((err) => {
      if (err) {
        done();
      } else {
        done(new Error('Expected done to be called with error'));
      }
    });
    const opSpy = jest.fn(() => false);
    const sink = drainModule.default(opSpy, doneSpy);
    sink(readSpy);
    sink.abort(true);
  });
});