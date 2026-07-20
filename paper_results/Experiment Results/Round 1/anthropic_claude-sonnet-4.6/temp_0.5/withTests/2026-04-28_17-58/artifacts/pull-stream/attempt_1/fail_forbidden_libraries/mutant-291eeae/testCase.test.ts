import { jest } from '@jest/globals';
import log from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js';
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/index.js';

describe('sinks/log', () => {
  it('should call console.log for each data item passing through the stream', (done) => {
    const originalConsoleLog = console.log;
    const logged: unknown[] = [];
    console.log = (data: unknown) => {
      logged.push(data);
    };

    pull(
      pull.values([1, 2, 3]),
      log(function (err: Error | null) {
        console.log = originalConsoleLog;
        expect(logged).toEqual([1, 2, 3]);
        done(err);
      })
    );
  });
});