import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when no done callback is supplied and an error occurs', () => {
    const sink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(new Error('Test error'), null);
    });
    expect(() => {
      sink(read);
    }).toThrowError('Test error');
  });
});