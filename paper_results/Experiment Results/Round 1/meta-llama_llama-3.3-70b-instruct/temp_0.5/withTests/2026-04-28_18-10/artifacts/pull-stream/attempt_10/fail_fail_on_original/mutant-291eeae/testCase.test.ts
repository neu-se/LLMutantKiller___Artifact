import { log } from "../../../sinks/log";

describe('log sink', () => {
  it('should log data to the console', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const read = log(function (data: any) {
      consoleLogSpy(data);
    });
    read(null, 'Hello, World!');
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Hello, World!');
  });
});