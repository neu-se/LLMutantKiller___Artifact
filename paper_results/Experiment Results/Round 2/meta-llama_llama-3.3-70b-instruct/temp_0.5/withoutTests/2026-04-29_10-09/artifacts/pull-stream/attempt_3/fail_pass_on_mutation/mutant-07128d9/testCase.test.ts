import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with the error when end is an error', () => {
    const done = jest.fn();
    const error = new Error('Test error');
    const read = jest.fn((err, cb) => {
      cb(error, null);
    });
    const sink = drainModule.default(null, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(error);
  });
});