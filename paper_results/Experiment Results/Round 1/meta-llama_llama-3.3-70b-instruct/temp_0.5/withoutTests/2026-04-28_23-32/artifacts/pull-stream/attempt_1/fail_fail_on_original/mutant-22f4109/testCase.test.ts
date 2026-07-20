import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when done is not provided', () => {
    const read = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    const sink = drain(null, null);
    expect(() => {
      sink(read);
    }).toThrowError('no done callback supplied');
  });
});