import { createWriteStream } from 'fs';
import { log } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('log sink behavior', () => {
  it('should log data to console', (done) => {
    const testData = ['test1', 'test2', 'test3'];
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const stream = pull(
      pull.values(testData),
      log(done)
    );

    stream(null, () => {
      expect(consoleSpy).toHaveBeenCalledTimes(testData.length);
      expect(consoleSpy).toHaveBeenCalledWith('test1');
      expect(consoleSpy).toHaveBeenCalledWith('test2');
      expect(consoleSpy).toHaveBeenCalledWith('test3');
      consoleSpy.mockRestore();
      done();
    });
  });
});