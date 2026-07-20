import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not throw an error when done is provided', () => {
    const read = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    const done = jest.fn();
    const sink = drainModule.default(null, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
  });
});