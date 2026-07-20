import { parse } from './crawler-url-parser.js';

describe('parse function', () => {
  it('should not log anything to the console when the module is required as a module', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    require('./crawler-url-parser.js');
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});