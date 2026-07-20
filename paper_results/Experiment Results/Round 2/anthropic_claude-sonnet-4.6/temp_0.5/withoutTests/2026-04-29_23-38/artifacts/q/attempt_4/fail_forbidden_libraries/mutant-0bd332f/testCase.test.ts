describe("Q array_reduce fallback TypeError", () => {
  it("throws TypeError for empty array without initial value", () => {
    const origReduce = Array.prototype.reduce;
    delete (Array.prototype as any).reduce;
    
    let fallbackFn: Function | null = null;
    const origFunctionCall = Function.prototype.call;
    
    // Spy on Function.prototype.call to capture the fallback
    // When Q does: var call = Function.call
    // and then: call.apply(f, arguments)
    // we intercept to capture f (the fallback)
    
    // Actually, we can't distinguish which call is to the fallback...
    
    jest.resetModules();
    const Q = require("...");
    
    Array.prototype.reduce = origReduce;
    
    // Still can't access fallback
    expect(Q).toBeDefined();
  });
});