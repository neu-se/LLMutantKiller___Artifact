import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not throw when end is an object on the original code but throw on the mutated code', () => {
    const done = jest.fn();
    const read = jest.fn((err, cb) => {
      cb({}, null);
    });
    const sink = drainModule.default(null, done);
    expect(() => {
      sink(read);
    }).not.toThrow();
  });
});