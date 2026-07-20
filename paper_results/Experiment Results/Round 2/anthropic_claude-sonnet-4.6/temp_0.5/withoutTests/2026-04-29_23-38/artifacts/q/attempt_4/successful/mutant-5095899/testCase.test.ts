describe("Q script tag branch", () => {
  it("should enter the else-if branch when window is undefined but self is defined", () => {
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Simulate a non-CommonJS environment by running the module factory directly
    // Extract the definition function from the module
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // The noConflict on the exported module throws - it only works as global
    // In the script branch, noConflict is set up properly on global.Q
    // We can test by simulating the environment
    
    const moduleSource = require("fs").readFileSync(modulePath, "utf8");
    
    // Run in a context where exports/module are not defined but self is defined
    const vm = require("vm");
    const selfObj = { Q: undefined as any };
    const context = vm.createContext({
      self: selfObj,
      setTimeout,
      clearTimeout,
      setImmediate,
      process,
      console,
    });
    
    vm.runInContext(moduleSource, context);
    
    // If original: self is defined, self !== "undefined" is true → branch entered → selfObj.Q is set
    // If mutated: self === "undefined" is false → branch NOT entered → throws error
    expect(typeof selfObj.Q).toBe("function");
  });
});