import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('String prototype monkey patching', () => {
  it('should not throw when String.prototype.plural is not defined', () => {
    // First, ensure the monkey patch is not applied by removing it if it exists
    delete (String.prototype as any).plural;

    // Now try to require the module - this should not throw in the original code
    // but will throw in the mutated code because it always tries to add the function
    // even when it's not needed (when the condition is hardcoded to true)
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).not.toThrow();
  });
});