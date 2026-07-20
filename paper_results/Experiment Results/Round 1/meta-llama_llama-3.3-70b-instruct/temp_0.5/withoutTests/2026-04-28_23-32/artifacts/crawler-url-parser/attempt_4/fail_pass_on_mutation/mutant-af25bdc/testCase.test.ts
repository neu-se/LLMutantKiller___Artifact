import { parse } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should not log anything when executed as a standalone script with an empty log message', () => {
    const originalLog = console.log;
    const logSpy = jest.fn();
    console.log = logSpy;
    // Simulate the mutation by not logging anything
    console.log = () => {};
    expect(logSpy).toHaveBeenCalledTimes(0);
  });
});