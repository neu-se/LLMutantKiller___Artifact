import log from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";

describe('log function', () => {
  it('should log data to the console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const done = jest.fn();
    log(done);
    expect(consoleLogSpy).toHaveBeenCalledTimes(0);
    const read = (cb: (any) => void) => {
      cb('Test data');
    };
    log(done);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Test data');
    expect(done).toHaveBeenCalledTimes(1);
  });
});