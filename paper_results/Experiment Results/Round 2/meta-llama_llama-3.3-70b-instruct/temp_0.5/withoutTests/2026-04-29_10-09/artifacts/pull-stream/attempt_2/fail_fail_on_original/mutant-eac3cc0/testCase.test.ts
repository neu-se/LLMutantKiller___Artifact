import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call read with abort when op returns false', (done) => {
    const op = () => false;
    const read = jest.fn();
    const doneCallback = jest.fn();
    const sink = drainModule.default(op, doneCallback);
    sink(read);
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenCalledWith(true, expect.any(Function));
    done();
  });
});