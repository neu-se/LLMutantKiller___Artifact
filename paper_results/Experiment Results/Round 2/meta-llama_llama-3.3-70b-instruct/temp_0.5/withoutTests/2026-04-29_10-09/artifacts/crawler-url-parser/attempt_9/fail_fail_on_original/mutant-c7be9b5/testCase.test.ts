import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should throw an error when called with a debugger statement', () => {
    const originalDebugger = global.debugger;
    global.debugger = () => {
      throw new Error('Debugger called');
    };
    const url = 'https://www.npmjs.com/package/electron-window-manager';
    expect(() => {
      require('../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
      parse(url);
    }).toThrowError('Debugger called');
    global.debugger = originalDebugger;
  });
});