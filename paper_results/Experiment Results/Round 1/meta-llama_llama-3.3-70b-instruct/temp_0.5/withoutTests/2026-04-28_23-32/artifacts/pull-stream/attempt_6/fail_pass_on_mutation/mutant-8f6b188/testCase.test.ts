import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with null when end is an object', (done) => {
    const callback = jest.fn();
    const read = jest.fn((err, cb) => {
      cb({ foo: 'bar' }, null);
    });
    const sink = drain(null, callback);
    sink(read);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ foo: 'bar' });
    done();
  });
});