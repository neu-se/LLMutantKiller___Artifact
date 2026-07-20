import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should call the provided callback with the correct error when aborting', () => {
    const callback = jest.fn();
    const err = jest.fn();
    const cb = jest.fn();
    const sink = drain(null, callback);
    sink.abort(err, cb);
    expect(callback).toHaveBeenCalledTimes(0);
    expect(err).toHaveBeenCalledTimes(0);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(true);
  });
});