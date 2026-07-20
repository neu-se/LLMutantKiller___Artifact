import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when end is not true', () => {
    const done = jest.fn();
    const read = jest.fn((err, cb) => {
      cb(true, 'test data');
    });
    const sink = drain(null, done);
    sink(read);
    expect(done).toHaveBeenCalledTimes(1);
    expect(() => {
      sink(read);
    }).toThrowError('test data');
  });
});