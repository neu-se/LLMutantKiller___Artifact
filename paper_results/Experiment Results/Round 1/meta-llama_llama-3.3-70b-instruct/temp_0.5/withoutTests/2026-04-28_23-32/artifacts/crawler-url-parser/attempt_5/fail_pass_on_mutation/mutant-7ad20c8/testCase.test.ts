import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle parsing of URLs correctly and process.exit should not be called', () => {
    const processExitSpy = jest.spyOn(process, 'exit');
    parse("https://www.npmjs.com/package/electron-window-manager");
    expect(processExitSpy).not.toHaveBeenCalled();
    processExitSpy.mockRestore();
  });
});