import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle error correctly', () => {
    const readSpy = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    const doneSpy = jest.fn();
    const sink = drain(null, doneSpy);
    sink(readSpy);
    expect(readSpy).toHaveBeenCalledTimes(1);
    sink.abort(new Error('test error'));
    expect(doneSpy).toHaveBeenCalledTimes(1);
    expect(doneSpy).toHaveBeenCalledWith(new Error('test error'));
  });
});