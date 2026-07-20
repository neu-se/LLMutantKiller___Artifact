import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when end is not true and done callback is not provided', () => {
    const read = jest.fn((err, cb) => {
      cb(true, 'error');
    });
    const sink = drain(null, null);
    expect(() => sink(read)).toThrowError('error');
  });
});