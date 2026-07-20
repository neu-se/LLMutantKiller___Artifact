import log from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log.js";

describe('log function', () => {
  it('should log data to the console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const done = jest.fn();
    log(done);
    expect(consoleLogSpy).toHaveBeenCalledTimes();
    const read = jest.fn((cb: (data: any) => void) => {
      cb('Test data');
    });
    jest.mock('../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js', () => ({
      __esModule: true,
      default: (read: (cb: (any) => void) => void, done: () => void) => {
        read((any) => {
          console.log(data);
          done();
        });
      },
    }));
    log(done);
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('Test data');
    expect(done).toHaveBeenCalledTimes(1);
  });
});