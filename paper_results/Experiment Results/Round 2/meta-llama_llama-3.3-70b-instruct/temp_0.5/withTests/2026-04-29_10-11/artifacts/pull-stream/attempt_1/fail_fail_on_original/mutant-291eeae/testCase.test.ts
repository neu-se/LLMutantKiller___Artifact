import { log } from '../../../../../../../../subject_repositories/pull-stream/sinks/log.js';
import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';
import { values } from '../../../../../../../../subject_repositories/pull-stream/sources/values.js';

describe('log sink', () => {
  it('should log data to console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const data = [1, 2, 3];

    pull(
      values(data),
      log(),
      drain()
    );

    expect(consoleLogSpy).toHaveBeenCalledTimes(data.length);
    consoleLogSpy.mockRestore();
  });
});