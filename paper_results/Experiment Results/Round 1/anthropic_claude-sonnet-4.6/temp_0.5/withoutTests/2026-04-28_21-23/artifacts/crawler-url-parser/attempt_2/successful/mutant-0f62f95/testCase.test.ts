import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser module loading behavior', () => {
  it('should not call console.log when required as a module', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Clear the module from cache to force re-evaluation
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    delete require.cache[modulePath];

    // Require the module fresh
    // In original code: if(!module.parent) block does NOT run when required as module
    // In mutated code: if(module.parent) block DOES run when required as module, calling console.log
    require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');

    // Original: console.log not called (passes)
    // Mutated: console.log IS called (fails)
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});