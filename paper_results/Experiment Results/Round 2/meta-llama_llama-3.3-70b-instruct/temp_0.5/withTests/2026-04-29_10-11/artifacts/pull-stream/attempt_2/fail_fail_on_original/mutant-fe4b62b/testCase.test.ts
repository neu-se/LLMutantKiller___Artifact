import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should call the provided callback with the correct error when aborting', () => {
    const callback = jest.fn();
    const err = new Error('Test error');
    const sink = drain(null, callback);
    sink.abort(err, callback);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(2, err);
  });
});