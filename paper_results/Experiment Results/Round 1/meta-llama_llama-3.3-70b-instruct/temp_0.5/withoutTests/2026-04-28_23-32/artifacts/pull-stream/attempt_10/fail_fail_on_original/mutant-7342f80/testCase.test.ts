import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied', () => {
    const sink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(null, null);
    });
    sink(read);
    expect(() => {
      sink.abort();
    }).toThrowError('no done callback supplied');
  });
});