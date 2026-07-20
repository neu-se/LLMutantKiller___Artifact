import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not call done with null when end is not true and not an error', () => {
    const done = jest.fn();
    const read = jest.fn((err, cb) => {
      cb('string', null);
    });
    const sink = drainModule.default(null, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).not.toHaveBeenCalledWith(null);
  });
});