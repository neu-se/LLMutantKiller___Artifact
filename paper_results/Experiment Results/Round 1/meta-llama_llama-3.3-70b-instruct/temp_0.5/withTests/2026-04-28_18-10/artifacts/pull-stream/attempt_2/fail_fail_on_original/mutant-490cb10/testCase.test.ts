import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain test', () => {
  it('should log an error when no done callback is supplied and the stream ends', () => {
    jest.useFakeTimers();
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const sink = drain(null, null);
    sink(true, null);
    jest.runAllTimers();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});