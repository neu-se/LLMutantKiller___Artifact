import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain test', () => {
  it('should not throw an error when a done callback is supplied', () => {
    const doneCallback = jest.fn();
    const sink = drain(null, doneCallback);
    sink(true, null);
    expect(doneCallback).toHaveBeenCalledTimes(1);
  });
});