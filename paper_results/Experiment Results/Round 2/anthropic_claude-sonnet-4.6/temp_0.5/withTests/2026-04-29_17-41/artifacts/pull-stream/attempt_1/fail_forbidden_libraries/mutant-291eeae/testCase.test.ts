import { jest } from '@jest/globals';

describe('sinks/log', () => {
  it('should call console.log with each data item', (done) => {
    const originalConsoleLog = console.log;
    const loggedValues: unknown[] = [];
    
    console.log = jest.fn((...args: unknown[]) => {
      loggedValues.push(args[0]);
    });

    const pull = require('../index.js');
    const log = require('../sinks/log.js');

    pull(
      pull.values([1, 2, 3]),
      log(function (err: Error | null) {
        console.log = originalConsoleLog;
        
        expect(loggedValues).toEqual([1, 2, 3]);
        done();
      })
    );
  });
});