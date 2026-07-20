import { log } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";
import * as console from 'console';

describe('log function', () => {
  it('should log data to the console', () => {
    const originalConsoleLog = console.log;
    let loggedData: any;
    console.log = (data: any) => {
      loggedData = data;
    };

    log((err: any) => {
      if (err) {
        throw err;
      }
    })('test data');

    console.log = originalConsoleLog;
    expect(loggedData).toBe('test data');
  });
});