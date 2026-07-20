import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should pass on the original code and fail on the mutated code', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const url = 'https://www.example.com';
    parse(url);
    expect(consoleLogSpy).not.toHaveBeenCalledWith('for testing purpose');
  });
});