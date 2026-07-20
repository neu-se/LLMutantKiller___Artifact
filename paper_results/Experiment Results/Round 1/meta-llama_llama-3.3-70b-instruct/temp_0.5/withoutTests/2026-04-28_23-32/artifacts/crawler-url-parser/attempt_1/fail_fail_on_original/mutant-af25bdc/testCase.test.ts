import { parse, extract, gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should log a message for testing purpose', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    require('../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith("for testing purpose");
  });
});