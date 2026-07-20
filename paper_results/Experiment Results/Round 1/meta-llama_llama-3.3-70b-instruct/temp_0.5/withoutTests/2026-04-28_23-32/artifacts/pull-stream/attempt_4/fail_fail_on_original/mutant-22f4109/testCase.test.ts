import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when done is provided in the mutated code', () => {
    const read = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    const done = jest.fn();
    const sink = drain(null, done);
    expect(() => {
      sink(read);
    }).toThrowError('no done callback supplied');
  });
});