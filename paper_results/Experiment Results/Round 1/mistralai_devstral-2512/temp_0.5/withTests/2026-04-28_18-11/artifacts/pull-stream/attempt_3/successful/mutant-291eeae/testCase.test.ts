import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import log from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('log sink behavior', () => {
  it('should log data to console', (done) => {
    const testData = ['test1', 'test2', 'test3'];
    const originalConsoleLog = console.log;
    const mockConsoleLog = jest.fn();

    console.log = mockConsoleLog;

    pull(
      values(testData),
      log((err: any) => {
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