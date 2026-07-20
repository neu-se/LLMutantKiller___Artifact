import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('String prototype monkey patching', () => {
  it('should not throw when String.prototype.plural is already defined', () => {
    // First, ensure the monkey patch is applied
    require("../../../../../../../../../../../subject_repositories/plural/index.js");
    
    // Verify that String.prototype.plural exists
    expect(typeof String.prototype.plural).toBe('function');
    
    // Try to require the module again - this should not throw in the original code
    // but will throw in the mutated code because it always tries to add the function
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).not.toThrow();
  });
});