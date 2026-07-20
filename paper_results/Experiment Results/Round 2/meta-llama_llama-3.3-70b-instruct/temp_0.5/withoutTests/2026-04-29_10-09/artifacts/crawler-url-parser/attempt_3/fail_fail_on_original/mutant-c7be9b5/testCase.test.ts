import { console } from 'console';

describe('crawler-url-parser', () => {
  it('should log a message to the console when called', () => {
    jest.spyOn(console, 'log');
    require('../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith('for testing purpose');
  });
});