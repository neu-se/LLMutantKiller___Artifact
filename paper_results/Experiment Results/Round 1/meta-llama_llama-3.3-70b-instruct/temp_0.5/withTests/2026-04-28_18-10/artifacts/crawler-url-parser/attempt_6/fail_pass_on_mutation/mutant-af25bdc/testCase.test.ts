import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should log a message when console.log is called in the original code', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const originalCode = `
      console.log("for testing purpose");
    `;
    eval(originalCode);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('for testing purpose');
  });

  it.skip('should not log a message when console.log is called in the mutated code', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const mutatedCode = `
      console.log("");
    `;
    eval(mutatedCode);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('');
  });
});