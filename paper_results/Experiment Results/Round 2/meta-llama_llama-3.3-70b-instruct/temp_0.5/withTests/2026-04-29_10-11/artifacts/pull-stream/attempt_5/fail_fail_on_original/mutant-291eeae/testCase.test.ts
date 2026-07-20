import { log } from '../sinks/log.js';

describe('log sink', () => {
  it('should log data to console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const data = [1, 2, 3];

    log(function (data) {
      consoleLogSpy(data);
    })(null, data[0]);

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    consoleLogSpy.mockRestore();
  });
});