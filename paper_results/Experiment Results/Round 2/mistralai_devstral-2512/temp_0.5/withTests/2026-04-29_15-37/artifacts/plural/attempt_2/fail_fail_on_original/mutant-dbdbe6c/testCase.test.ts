import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('String prototype monkey patching', () => {
  it('should throw when String.prototype.plural is already defined', () => {
    // Manually add the plural function to String.prototype to simulate it already existing
    String.prototype.plural = function() { return 'already exists'; };

    // Now try to require the module - this should throw in the mutated code
    // but not in the original code (which checks if it's undefined first)
    expect(() => {
      require("../../../../../../../../../../../subject_repositories/plural/index.js");
    }).toThrow('Unable to add plural function to String object');
  });
});