const pull = require('../../../../../../../../../subject_repositories/pull-stream/index.js');
const log = require('../../../../../../../../../subject_repositories/pull-stream/sinks/log.js');

describe('sinks/log', () => {
  it('should call console.log with each data item passing through the stream', (done) => {
    const loggedValues: unknown[] = [];
    const originalConsoleLog = console.log;
    
    console.log = (value: unknown) => {
      loggedValues.push(value);
    };

    pull(
      pull.values([10, 20, 30]),
      log(function (err: Error | null) {
        console.log = originalConsoleLog;
        
        expect(loggedValues).toEqual([10, 20, 30]);
        done();
      })
    );
  });
});