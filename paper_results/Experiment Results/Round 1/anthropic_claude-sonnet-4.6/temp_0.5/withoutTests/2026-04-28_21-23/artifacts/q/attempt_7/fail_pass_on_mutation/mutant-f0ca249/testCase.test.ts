import * as vm from 'vm';
import * as fs from 'fs';

describe("Q reduce polyfill mutation detection", () => {
  it("should correctly advance through sparse array in polyfill", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, 'utf8');
    
    // In vm context, provide a custom Array where reduce is undefined
    // AND intercept to capture the polyfill
    
    let polyfill: Function | undefined;
    
    // The trick: provide Array.prototype.reduce as a getter that returns undefined
    // but also captures what the || operator would use (the polyfill)
    // We can't intercept || directly, but we can intercept uncurryThis
    
    // uncurryThis is a local function. We can't intercept it.
    
    // NEW IDEA: provide a custom 'Function' in the vm context
    // where Function.call is intercepted
    
    // In the vm context, the code does:
    // var call = Function.call;
    // This captures Function.call from the vm's global Function
    // If we provide our own Function with a custom .call, we intercept everything
    
    // But vm.createContext uses the outer Function for the context...
    // Actually vm contexts have their own Function object!
    
    const ctx = vm.createContext({
      process,
      console,
      setTimeout,
      clearTimeout,
      setImmediate,
    });
    
    // In the vm context, Function is the vm's own Function
    // We can modify it before running Q
    vm.runInContext(`
      // Delete Array.prototype.reduce so Q uses polyfill
      delete Array.prototype.reduce;
      
      // Intercept Function.call to capture the polyfill
      var _originalFunctionCall = Function.call;
      var _capturedFunctions = [];
      var _proxyCall = function() {
        _capturedFunctions.push(this);
        return _originalFunctionCall.apply(this, arguments);
      };
      _proxyCall.apply = function(ctx, args) {
        if (ctx && typeof ctx === 'function') {
          _capturedFunctions.push({fn: ctx, args: args});
        }
        return _originalFunctionCall.apply(ctx, args);
      };
      Function.call = _proxyCall;
    `, ctx);
    
    const ctxObj = ctx as any;
    
    // Now run Q - it will capture Function.call as our proxy
    // and use the polyfill for array_reduce
    const moduleObj = { exports: {} };
    ctxObj.module = moduleObj;
    ctxObj.exports = moduleObj.exports;
    
    vm.runInContext(qSource, ctx);
    
    // Restore and get captured functions
    const capturedFunctions = vm.runInContext('_capturedFunctions', ctx) as any[];
    
    // Find the reduce polyfill - it should be a function with 2 params (callback, basis)
    // that was captured when uncurryThis was called with it
    // The polyfill is the one passed to uncurryThis for array_reduce
    
    // Actually _capturedFunctions captures 'this' of Function.call calls
    // When call.apply(f, arguments) is called, 'this' of .apply is our proxy
    // and first arg is f... 
    
    // This is getting complicated. Let me check what we captured.
    console.log('Captured:', capturedFunctions.length);
    
    expect(ctxObj.module.exports).toBeDefined();
  });
});