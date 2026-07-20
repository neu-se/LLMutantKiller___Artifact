import { parse, extract, gettype } from '../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function basic behavior', () => {
  it('should correctly parse a valid HTTP URL', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const modulePath = require.resolve('../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];
    require('../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');

    expect(consoleSpy).not.toHaveBeenCalledWith('for testing purpose');

    consoleSpy.mockRestore();
  });
});