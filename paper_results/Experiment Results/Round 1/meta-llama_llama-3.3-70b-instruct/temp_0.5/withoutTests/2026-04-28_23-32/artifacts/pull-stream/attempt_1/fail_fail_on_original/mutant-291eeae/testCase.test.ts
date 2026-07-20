import { log } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";

describe('log function', () => {
  it('should log data to the console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const done = jest.fn();
    const data = 'Test data';
    const read = jest.fn((cb: (data: any) => void) => {
      cb(data);
    });
    const drainSpy = jest.fn((read: (cb: (data: any) => void) => void, done: () => void) => {
      read((data: any) => {
        consoleLogSpy(data);
        done();
      });
    });
    jest.mock('../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js', () => ({
      __esModule: true,
      default: drainSpy,
    }));
    log(done);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith(data);
    expect(done).toHaveBeenCalledTimes(1);
  });
});