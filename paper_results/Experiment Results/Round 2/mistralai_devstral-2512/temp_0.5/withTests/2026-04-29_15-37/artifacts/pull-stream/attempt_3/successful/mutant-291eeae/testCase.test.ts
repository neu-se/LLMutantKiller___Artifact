import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import log from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";

describe('log sink behavior', () => {
  it('should log data to console', (done) => {
    const testData = ['test1', 'test2', 'test3'];
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const source = (abort: any, cb: any) => {
      if (abort) return cb(abort);
      if (testData.length === 0) return cb(true);
      cb(null, testData.shift());
    };

    pull(
      source,
      log((err: any) => {
        expect(consoleSpy).toHaveBeenCalledTimes(3);
        expect(consoleSpy).toHaveBeenCalledWith('test1');
        expect(consoleSpy).toHaveBeenCalledWith('test2');
        expect(consoleSpy).toHaveBeenCalledWith('test3');
        consoleSpy.mockRestore();
        done(err);
      })
    );
  });
});