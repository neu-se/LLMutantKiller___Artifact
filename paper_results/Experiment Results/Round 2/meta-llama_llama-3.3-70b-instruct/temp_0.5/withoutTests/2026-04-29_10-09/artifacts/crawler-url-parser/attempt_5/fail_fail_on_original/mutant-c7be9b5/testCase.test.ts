import { console } from 'console';
import '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should log a message to the console when called', () => {
    const logSpy = jest.spyOn(console, 'log');
    require('../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith('for testing purpose');
  });
});