import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call done with the correct error when end is not true', (done) => {
    const testError = new Error('Test error');
    const callback = jest.fn();
    const sink = drain(null, callback);
    sink(testError, () => {
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(testError);
      done();
    });
  });
});