import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should not call done with error when end is true', (done) => {
    const callback = jest.fn();
    const read = jest.fn((err, cb) => {
      cb(true, null);
    });
    const sink = drain(null, callback);
    sink(read);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(null);
    const read2 = jest.fn((err, cb) => {
      cb(true, null);
    });
    const sink2 = drain(null, callback);
    sink2(read2);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(2, null);
    done();
  });
});