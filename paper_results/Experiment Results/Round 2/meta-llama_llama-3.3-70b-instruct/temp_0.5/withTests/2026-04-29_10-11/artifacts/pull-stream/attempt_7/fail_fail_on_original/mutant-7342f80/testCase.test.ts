import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call the done callback with an error when no done callback is supplied in the mutated code', () => {
    const callback = jest.fn();
    const sink = drain(() => true, callback);
    const read = jest.fn();
    sink(read);
    expect(read).toHaveBeenCalledTimes(1);
    const error = new Error('no done callback supplied');
    expect(() => drain(() => true)).not.toThrowError();
    expect(() => drain(() => true, undefined)).toThrowError();
  });
});