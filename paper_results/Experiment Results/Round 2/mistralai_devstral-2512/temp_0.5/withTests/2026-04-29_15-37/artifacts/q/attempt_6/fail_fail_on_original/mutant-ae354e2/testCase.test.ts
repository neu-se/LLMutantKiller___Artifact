const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("deprecate function", () => {
  it("should produce correct deprecation warning message with proper formatting", () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Extract the deprecate function from the module's source
    const fs = require('fs');
    const path = require('path');
    const qPath = path.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, 'utf8');

    // Find and extract the deprecate function
    const deprecateMatch = qSource.match(/function deprecate\\(callback, name, alternative\\)[^}]+return callback\\.apply\\(callback, arguments\\);[^}]+}/);
    const deprecate = new Function(`
      return ${deprecateMatch[0]};
    `)();

    const testFunc = () => "test result";
    const deprecatedFunc = deprecate(testFunc, "oldFunc", "newFunc");

    deprecatedFunc();

    expect(consoleWarnSpy).toHaveBeenCalledWith("oldFunc is deprecated, use newFunc");
    consoleWarnSpy.mockRestore();
  });
});