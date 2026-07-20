import { log } from './log.js';
import { drain } from './drain.js';
import { values } from './values.js';

describe('log sink', () => {
  it('should log data to console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const data = [1, 2, 3];

    pull(
      values(data),
      log(() => {
        expect(consoleLogSpy).toHaveBeenCalledTimes(data.length);
        consoleLogSpy.mockRestore();
      })
    );
  });
});