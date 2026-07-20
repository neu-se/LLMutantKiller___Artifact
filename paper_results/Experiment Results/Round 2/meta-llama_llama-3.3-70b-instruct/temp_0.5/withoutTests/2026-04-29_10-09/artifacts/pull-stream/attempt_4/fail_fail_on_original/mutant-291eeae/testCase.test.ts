import log from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";
import * as consoleModule from 'console';

describe('log function', () => {
  it('should log data to the console', () => {
    const consoleSpy = jest.spyOn(consoleModule, 'log');
    log(() => {})('test data');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('test data');
  });
});