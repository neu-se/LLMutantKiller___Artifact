import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done callback only when provided', (done) => {
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
    setTimeout(() => {
      expect(calledWithDone).toBe(true);
      calledWithDone = false;
      drain(null, null);
      read(null, () => {});
      setTimeout(() => {
        expect(calledWithoutDone).toBe(false);
        done();
      }, 0);
    }, 0);
  });
});