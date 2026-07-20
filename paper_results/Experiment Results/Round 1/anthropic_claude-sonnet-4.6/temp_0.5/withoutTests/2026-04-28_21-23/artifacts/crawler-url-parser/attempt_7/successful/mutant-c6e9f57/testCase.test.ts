describe("crawler-url-parser module internals", () => {
  it("result_normalize_options should have stripWWW property set to true", () => {
    const resolvedPath = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
    require(resolvedPath);
    const cachedModule = require.cache[resolvedPath];
    // Access the module's internal variables through its closure
    // by evaluating within its context - not possible directly
    
    // Instead verify through VM
    const vm = require('vm');
    const fs = require('fs');
    const src = fs.readFileSync(resolvedPath, 'utf8');
    const sandbox = { require, module: { exports: {}, parent: true }, exports: {}, __filename: resolvedPath, __dirname: require('path').dirname(resolvedPath), console };
    sandbox.module.exports = sandbox.exports;
    vm.runInNewContext(src, sandbox);
    // The result_normalize_options is in the sandbox scope but not directly accessible
    // unless we modify the script to expose it
    const wrappedSrc = src.replace(
      'module.exports.parse = parse;',
      'module.exports.parse = parse; module.exports._options = result_normalize_options;'
    );
    const sandbox2 = { require, module: { exports: {}, parent: true }, exports: {}, __filename: resolvedPath, __dirname: require('path').dirname(resolvedPath), console };
    sandbox2.module.exports = sandbox2.exports;
    vm.runInNewContext(wrappedSrc, sandbox2);
    expect(sandbox2.module.exports._options).toHaveProperty('stripWWW', true);
  });
});