import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not throw an error when end is a non-error, non-true value', () => {
    const done = jest.fn();
    const read = jest.fn((err, cb) => {
      cb('string', null);
    });
    const sink = drainModule.default(null, done);
    expect(() => {
      sink(read);
      done();
    }).not.toThrow();
  });
});