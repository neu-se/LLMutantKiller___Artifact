import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should handle error correctly', () => {
    const readSpy = jest.fn((err, cb) => {
      cb(null, 'data');
    });
    const doneSpy = jest.fn();
    const sink = drain(null, doneSpy);
    sink(readSpy);
    expect(readSpy).toHaveBeenCalledTimes(1);
    sink.abort();
    expect(readSpy).toHaveBeenCalledTimes(2);
    expect(doneSpy).toHaveBeenCalledTimes(1);
  });
});