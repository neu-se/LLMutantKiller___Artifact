import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not throw when end is not true and not an error', () => {
    const done = jest.fn();
    const read = jest.fn((err, cb) => {
      cb('not true', null);
    });
    const sink = drainModule.default(null, done);
    expect(() => {
      sink(read);
    }).not.toThrow();
  });
});