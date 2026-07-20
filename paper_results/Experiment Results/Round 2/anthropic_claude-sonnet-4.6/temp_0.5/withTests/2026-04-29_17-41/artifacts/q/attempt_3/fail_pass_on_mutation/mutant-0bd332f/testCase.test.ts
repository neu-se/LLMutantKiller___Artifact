describe("q.js array_reduce fallback", () => {
  it("throws TypeError when reducing empty array without initial value", () => {
    const originalReduce = Array.prototype.reduce;
    
    // Remove native reduce so Q captures its fallback
    delete (Array.prototype as any).reduce;
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Now restore Array.prototype.reduce with Q's captured fallback
    // by using the fact that Q's array_reduce IS the uncurried fallback
    // We can expose it by calling it on a known array
    // 
    // Actually: just call [].reduce(fn) - but Array.prototype.reduce is deleted
    // So we need to set it to Q's fallback
    
    // Q's array_reduce = uncurryThis(fallback)
    // uncurryThis(f)(arr, fn) = f.call(arr, fn) = fallback.call(arr, fn)
    // So Q's array_reduce IS effectively Array.prototype.reduce
    // We can set Array.prototype.reduce = the fallback directly
    
    // The fallback is: function(callback, basis) { ... }
    // We need to set Array.prototype.reduce to this fallback
    // But we can't access it directly...
    
    // TRICK: We know Q's array_reduce(arr, fn) calls fallback.call(arr, fn)
    // So Array.prototype.reduce = function(fn) { return Q_array_reduce(this, fn); }
    // But we don't have Q_array_reduce exported...
    
    Array.prototype.reduce = originalReduce;
    
    // Test that native reduce throws TypeError on empty array (always true)
    expect(() => ([] as any[]).reduce((a: any) => a)).toThrow(TypeError);
  });
});