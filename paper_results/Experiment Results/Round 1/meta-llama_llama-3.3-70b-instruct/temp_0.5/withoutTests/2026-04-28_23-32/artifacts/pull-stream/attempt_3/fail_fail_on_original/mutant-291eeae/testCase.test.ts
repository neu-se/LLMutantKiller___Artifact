import log from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";

describe('log function', () => {
  it('should log data to the console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const done = jest.fn();
    log(done);
    const read = jest.fn((cb: (data: any) => void) => {
      cb('Test data');
    });
    const drain = jest.fn((read: (cb: (data: any) => void) => void, done: () => void) => {
      read((data: any) => {
        console.log(data);
        done();
      });
    });
    jest.mock('../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js', () => ({ default: drain }));
    log(done);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Test data');
    expect(done).toHaveBeenCalledTimes(1);
  });
});