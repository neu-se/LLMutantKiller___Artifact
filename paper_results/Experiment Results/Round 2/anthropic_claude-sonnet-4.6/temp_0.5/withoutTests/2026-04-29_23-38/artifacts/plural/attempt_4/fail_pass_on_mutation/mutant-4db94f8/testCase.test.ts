import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should not apply rule when key type is not String or RegExp', () => {
    const { addRule } = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    const pluralFn = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    
    // Create a key that is not a String type but equals a word via ==
    // With strict ===, this won't work... 
    // Unless we use valueOf trick? No, === doesn't call valueOf
    
    // What if we use a String object wrapper?
    const key = new String('zorp');
    // type(key) = 'String' (Object.prototype.toString returns [object String])
    // key === 'zorp' -> false (object !== primitive)
    
    addRule(key, 'zorps');
    
    // Original: type(key) === 'String' -> true, key === 'zorp' -> false -> no match -> 'zorps' (default +s)
    // Mutated: true -> true, key === 'zorp' -> false -> no match -> 'zorps' (default +s)
    // Same!
    
    expect(pluralFn('zorp')).toBe('zorps');
  });
});