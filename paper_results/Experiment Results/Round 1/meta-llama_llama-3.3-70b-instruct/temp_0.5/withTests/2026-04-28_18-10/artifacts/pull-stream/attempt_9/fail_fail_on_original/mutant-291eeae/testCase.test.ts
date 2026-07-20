import { log } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log";

describe('log sink', () => {
  it('should log data to the console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const drainSpy = jest.fn();
    log(drainSpy)({ end: false, data: 'Hello, World!' }, (err) => {
      if (err) throw err;
    });
    expect(drainSpy).toHaveBeenCalledTimes(0);
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Hello, World!');
  });
});