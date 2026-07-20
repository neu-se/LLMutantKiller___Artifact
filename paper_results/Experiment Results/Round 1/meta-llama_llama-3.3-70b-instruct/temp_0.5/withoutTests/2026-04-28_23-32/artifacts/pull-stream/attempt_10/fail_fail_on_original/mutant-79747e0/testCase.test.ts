import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done callback only when provided', () => {
    let callbackCalledWithDone = false;
    let callbackCalledWithoutDone = false;
    const doneCallback = () => {
      callbackCalledWithDone = true;
    };
    const read = jest.fn((err, cb) => {
      cb(true, null);
    });
    const drain = drainModule.default;
    drain(null, doneCallback);
    read(null, () => {});
    read(null, () => {});
    expect(callbackCalledWithDone).toBe(true);
    callbackCalledWithDone = false;
    drain(null, null);
    read(null, () => {});
    read(null, () => {});
    expect(callbackCalledWithoutDone).toBe(false);
  });
});