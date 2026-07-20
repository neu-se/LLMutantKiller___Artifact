import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done callback only when provided', () => {
    let calledWithDone = false;
    let calledWithoutDone = false;
    const doneCallback = () => {
      calledWithDone = true;
    };
    const read = jest.fn((err, cb) => {
      cb(true, null);
    });
    const drain = drainModule.default;
    drain(null, doneCallback);
    read(null, () => {});
    expect(calledWithDone).toBe(true);
    calledWithDone = false;
    drain(null, null);
    read(null, () => {});
    expect(calledWithoutDone).toBe(false);
  });
});