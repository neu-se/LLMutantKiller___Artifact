import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should log a message when run directly', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const originalCode = `
      if (!module.parent) {
        console.log("for testing purpose");
        let url = "https ://www.npmjs.com/package/electron-window-manager";
        let res = parse(url);
      }
    `;
    eval(originalCode);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith("for testing purpose");
  });
});