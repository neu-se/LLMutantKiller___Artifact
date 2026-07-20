import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain test', () => {
  it('should log an error when no done callback is supplied and the stream ends', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error');
    const sink = drain(null, null);
    sink(null, function (end, data) {
      sink(end, data);
    });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  });
});