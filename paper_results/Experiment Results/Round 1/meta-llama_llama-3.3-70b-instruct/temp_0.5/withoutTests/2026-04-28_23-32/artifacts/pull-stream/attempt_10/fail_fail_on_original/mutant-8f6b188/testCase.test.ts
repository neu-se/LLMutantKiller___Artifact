import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with error when end is an object that equals true', (done) => {
    const callback = jest.fn();
    const read = jest.fn((err, cb) => {
      cb({ valueOf: () => true }, null);
    });
    const sink = drain(null, callback);
    sink(read);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ valueOf: () => true });
    done();
  });
});