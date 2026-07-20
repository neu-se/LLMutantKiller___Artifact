import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should log a message when run directly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const originalModule = require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith("for testing purpose");
  });
});