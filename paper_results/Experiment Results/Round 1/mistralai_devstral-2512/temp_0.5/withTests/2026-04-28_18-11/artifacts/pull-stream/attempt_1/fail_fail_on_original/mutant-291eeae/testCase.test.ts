import { createWriteStream } from 'fs';
import { log } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('log sink behavior', () => {
  it('should log data to console', (done) => {
    const testData = ['test1', 'test2', 'test3'];
    const originalConsoleLog = console.log;
    const mockConsoleLog = jest.fn();

    console.log = mockConsoleLog;

    pull(
      pull.values(testData),
      log((err) => {
        console.log = originalConsoleLog;
        expect(mockConsoleLog).toHaveBeenCalledTimes(testData.length);
        expect(mockConsoleLog).toHaveBeenCalledWith('test1');
        expect(mockConsoleLog).toHaveBeenCalledWith('test2');
        expect(mockConsoleLog).toHaveBeenCalledWith('test3');
        done(err);
      })
    );
  });
});