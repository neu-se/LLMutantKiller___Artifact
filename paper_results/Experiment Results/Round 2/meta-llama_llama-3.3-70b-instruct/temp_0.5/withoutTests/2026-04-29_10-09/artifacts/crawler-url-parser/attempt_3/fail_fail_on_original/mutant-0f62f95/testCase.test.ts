import { parse } from '../../crawler-url-parser.js';

describe('parse function', () => {
  it('should not log anything to the console when the input URL is valid', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    parse('https://www.example.com');
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });
});