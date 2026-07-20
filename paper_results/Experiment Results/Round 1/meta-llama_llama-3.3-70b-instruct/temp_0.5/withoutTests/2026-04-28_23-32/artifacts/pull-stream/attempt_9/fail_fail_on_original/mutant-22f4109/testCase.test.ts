import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when done is provided and called with an error in the mutated code', () => {
    const read = jest.fn((err, cb) => {
      cb(new Error('Test error'), 'data');
    });
    const done = jest.fn();
    const sink = drain(null, done);
    expect(() => {
      sink(read);
    }).toThrowError('Test error');
  });
});