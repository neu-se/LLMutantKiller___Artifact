import { parse } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should throw an error when executed as a standalone script with a mutated log message', () => {
    const originalLog = console.log;
    const logSpy = jest.fn();
    console.log = logSpy;
    expect(() => {
      // Simulate the mutation by logging an empty string
      console.log = () => {};
      require('./crawler-url-parser.js');
    }).toThrowError();
    console.log = originalLog;
  });
});