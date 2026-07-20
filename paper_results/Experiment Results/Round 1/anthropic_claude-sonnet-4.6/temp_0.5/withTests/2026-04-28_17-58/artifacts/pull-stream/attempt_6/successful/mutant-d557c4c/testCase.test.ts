import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull', () => {
  it('should not attempt to call sink on a non-object non-function value', () => {
    // When s is a non-object truthy value (e.g. a boxed primitive or array),
    // original code: else if (s && typeof s === 'object') 
    //   - arrays ARE objects, so this would match for arrays too
    // The real difference: typeof null === 'object' is false after && check
    // 
    // Key case: s is an array (typeof [] === 'object') - both behave same
    // s is a function - goes through if branch, not else if
    //
    // What about s being a non-object? Like a number 42?
    // Original: else if (42 && typeof 42 === 'object') -> false, skip
    // Mutated:  else if (42 && true) -> true, tries 42.sink(read) -> TypeError
    
    const source = (() => {
      let i = 0;
      return (abort: any, cb: Function) => {
        if (abort) return cb(abort);
        if (i >= 3) return cb(true);
        cb(null, i++);
      };
    })();

    // Pass a non-object non-function truthy value as s
    // Original: skips the else if block (not an object)
    // Mutated: enters else if, tries to call .sink on it -> throws
    const nonObject = Object.create(null); // typeof is 'object', won't distinguish
    
    // Use a number wrapped to look truthy but not object
    // Actually let's use a real non-object: a symbol or number
    // But pull() would normally only be called with functions/objects...
    // 
    // The REAL practical difference: s is a function with .sink and .source
    // In original: goes through if(function) branch, read=s(read), done
    // In mutated: goes through if(function) branch, read=s(read), 
    //             then else if is NOT reached (it's else if!)
    // 
    // Wait - I keep confusing myself. else if means it's mutually exclusive!
    // If s IS a function, the else if is NEVER evaluated regardless of mutation!
    
    // So mutation ONLY matters when s is NOT a function.
    // Original: s must be a non-null object
    // Mutated: s just needs to be truthy
    
    // Test: pass a non-function non-object truthy value
    expect(() => {
      // @ts-ignore - intentionally passing wrong type to test behavior
      pull(source, 42 as any);
    }).not.toThrow();
    
    // With mutated code, this would throw because it tries (42).sink(read)
  });
});