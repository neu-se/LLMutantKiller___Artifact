import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with null when end is true', () => {
    const done = jest.fn();
    const read = jest.fn((err, cb) => {
      cb(true, null);
    });
    const sink = drainModule.default(null, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(null);
  });
});