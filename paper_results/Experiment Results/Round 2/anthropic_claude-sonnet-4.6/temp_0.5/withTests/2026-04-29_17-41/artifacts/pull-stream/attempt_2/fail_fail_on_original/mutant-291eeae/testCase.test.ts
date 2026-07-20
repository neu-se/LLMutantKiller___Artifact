import pull from '../index.js';
import log from '../sinks/log.js';

describe('sinks/log', () => {
  it('should call console.log with each data item passing through the stream', (done) => {
    const loggedValues: unknown[] = [];
    const originalConsoleLog = console.log;
    
    console.log = (value: unknown) => {
      loggedValues.push(value);
    };

    (pull as any)(
      (pull as any).values([10, 20, 30]),
      (log as any)(function (err: Error | null) {
        console.log = originalConsoleLog;
        
        expect(loggedValues).toEqual([10, 20, 30]);
        done();
      })
    );
  });
});