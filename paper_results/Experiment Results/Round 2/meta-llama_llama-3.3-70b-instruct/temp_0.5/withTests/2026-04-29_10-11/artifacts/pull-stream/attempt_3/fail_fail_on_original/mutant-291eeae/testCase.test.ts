import { log } from '../../../sinks/log.js';
import { drain } from '../../../sinks/drain.js';
import { values } from '../../../sources/values.js';

describe('log sink', () => {
  it('should log data to console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const data = [1, 2, 3];

    pull(
      values(data),
      log((data) => {
        expect(data).toBeGreaterThan(0);
      }),
      drain()
    );

    expect(consoleLogSpy).toHaveBeenCalledTimes(data.length);
    consoleLogSpy.mockRestore();
  });
});