import vm from "vm";
import fs from "fs";

describe("Q array_reduce fallback TypeError", () => {
  it("throws TypeError on empty array without initial value in fallback", () => {
    const qPath = require.resolve(
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );
    const qSource = fs.readFileSync(qPath, "utf8");

    const context = vm.createContext({
      module: { exports: {} },
      exports: {},
      setTimeout,
      clearTimeout,
      process,
    });

    // Delete Array.prototype.reduce so Q uses its fallback
    vm.runInContext("delete Array.prototype.reduce;", context);

    // Override Function.call BEFORE loading Q, so Q captures our override
    vm.runInContext(`
      var _origFnCall = Function.call;
      var _capturedFns = [];
      Function.call = function() {
        if (typeof this === 'function') {
          _capturedFns.push(this);
        }
        return _origFnCall.apply(this, arguments);
      };
    `, context);

    // Load Q - Q does: var call = Function.call (captures our override)
    vm.runInContext(qSource, context);

    // Trigger array_reduce synchronously
    vm.runInContext(`
      var Q = module.exports;
      var d = Q.defer();
      d.promise.then(function() {});
      d.resolve(42);
      Function.call = _origFnCall;
    `, context);

    // Find and test the reduce fallback
    const result = vm.runInContext(`
      var reduceFallback = null;
      for (var i = 0; i < _capturedFns.length; i++) {
        try {
          var r = _capturedFns[i].call([1,2,3], function(a,b){return a+b;});
          if (r === 6) { reduceFallback = _capturedFns[i]; break; }
        } catch(e) {}
      }
      if (!reduceFallback) 'no_fallback';
      else {
        var count = 0;
        var proxy = new Proxy([], {
          has: function(t,p) { if(++count>5) throw new RangeError('loop'); return false; },
          get: function(t,p) { return p==='length'?0:undefined; }
        });
        var threw = false;
        try { reduceFallback.call(proxy, function(a,b){return b;}); }
        catch(e) { threw = e instanceof TypeError; }
        threw ? 'type_error' : 'other_error';
      }
    `, context);

    expect(result).toBe("type_error");
  });
});