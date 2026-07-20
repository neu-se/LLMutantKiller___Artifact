import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done callback only when provided', (done) => {
    let callbackCalled = false;
    const doneCallback = () => {
      callbackCalled = true;
    };
    const read = jest.fn((err, cb) => {
      cb(true, null);
    });
    const drain = drainModule.default;
    drain(null, doneCallback);
    read(null, () => {});
    read(null, () => {});
    expect(callbackCalled).toBe(true);
    callbackCalled = false;
    drain(null, null);
    read(null, () => {});
    read(null, () => {});
    expect(callbackCalled).toBe(false);
    done();
  });
});