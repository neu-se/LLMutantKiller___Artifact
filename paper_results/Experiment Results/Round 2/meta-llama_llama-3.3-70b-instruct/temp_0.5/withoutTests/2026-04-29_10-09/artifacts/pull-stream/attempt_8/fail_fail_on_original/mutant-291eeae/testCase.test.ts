import log from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";

describe('log function', () => {
  it('should log data to the console', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    log((err: any) => {
      if (err) throw err;
    })('test data');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('test data');
  });
});