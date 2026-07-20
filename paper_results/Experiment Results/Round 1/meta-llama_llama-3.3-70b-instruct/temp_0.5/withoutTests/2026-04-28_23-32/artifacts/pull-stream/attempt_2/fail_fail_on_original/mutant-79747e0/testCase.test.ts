import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done callback only when provided', (done) => {
    let called = false;
    const doneCallback = () => {
      called = true;
    };
    const read = jest.fn((err, cb) => {
      cb(null, null);
    });
    const drain = drainModule.default;
    drain(null, doneCallback);
    read(null, () => {});
    expect(called).toBe(true);
    called = false;
    drain(null, null);
    read(null, () => {});
    expect(called).toBe(false);
    done();
  });
});