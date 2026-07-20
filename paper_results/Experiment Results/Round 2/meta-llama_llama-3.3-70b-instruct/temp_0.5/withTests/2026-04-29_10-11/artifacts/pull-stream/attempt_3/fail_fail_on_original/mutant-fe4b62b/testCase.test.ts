import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call the provided callback with the correct error when aborting', () => {
    const callback = jest.fn();
    const err = jest.fn();
    const sink = drain(null, callback);
    sink.abort(err, callback);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(err).toHaveBeenCalledTimes(1);
  });
});