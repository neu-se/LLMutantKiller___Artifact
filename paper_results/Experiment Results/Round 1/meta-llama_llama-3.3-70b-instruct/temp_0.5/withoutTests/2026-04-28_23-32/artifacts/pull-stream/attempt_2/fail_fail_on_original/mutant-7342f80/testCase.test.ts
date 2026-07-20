import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when done callback is not supplied and an error occurs', () => {
    const sink = drain(null, null);
    const read = jest.fn((err, cb) => {
      cb(new Error('Test error'), null);
    });
    expect(() => {
      sink(read);
      sink.abort();
    }).toThrowError('no done callback supplied');
  });
});