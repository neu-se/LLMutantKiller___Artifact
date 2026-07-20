import * as vm from 'vm';
import * as fs from 'fs';

describe("array_reduce polyfill", () => {
  it("throws TypeError when called on empty array without an initial value", () => {
    const context = vm.createContext({
      process,
      setTimeout,
      clearTimeout,
      setImmediate,
    });

    // Remove native Array.prototype.reduce so Q uses its internal polyfill
    vm.runInContext("delete Array.prototype.reduce;", context);

    const qSource = fs.readFileSync(
      require.resolve("../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    // Patch the source to expose the internal array_reduce via Q for testing
    const patched = qSource.replace(
      "return Q;",
      "Q._array_reduce = array_reduce; return Q;"
    );

    vm.runInContext("var module = { exports: {} }; var exports = module.exports;", context);
    vm.runInContext(patched, context);

    // Original: polyfill throws TypeError on empty array with no initial value
    // Mutated:  polyfill loops forever → vm timeout throws a non-TypeError Error
    let caughtError: unknown = null;
    try {
      const script = new vm.Script(
        "module.exports._array_reduce([], function(a, b) { return b; })"
      );
      script.runInContext(context, { timeout: 200 });
    } catch (e) {
      caughtError = e;
    }

    expect(caughtError).not.toBeNull();
    // The vm context's TypeError is a different class from the outer TypeError,
    // so check by name
    expect((caughtError as Error).constructor.name).toBe("TypeError");
  });
});