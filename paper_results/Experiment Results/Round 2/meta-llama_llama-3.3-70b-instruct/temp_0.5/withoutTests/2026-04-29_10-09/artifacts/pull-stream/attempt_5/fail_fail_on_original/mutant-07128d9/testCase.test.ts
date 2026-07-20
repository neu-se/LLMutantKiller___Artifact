import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw when end is an object', () => {
    const done = jest.fn();
    const read = jest.fn((err, cb) => {
      cb({}, null);
    });
    const sink = drainModule.default(null, done);
    expect(() => {
      sink(read);
    }).toThrow();
  });
});