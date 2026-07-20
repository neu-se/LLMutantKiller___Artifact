import { log } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/log";

describe('log sink', () => {
  it('should log data to the console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const logFunction = log((data: any) => {
      consoleLogSpy(data);
    });
    logFunction(null, 'Hello, World!');
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Hello, World!');
  });
});