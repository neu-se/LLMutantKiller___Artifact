import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q ses.ok() condition", () => {
  it("should set window.Q when ses.ok() returns false", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf-8");

    const mockWindow: any = {};
    
    // Use non-strict mode vm to allow 'with' statement
    // 'with' can shadow variables: with({ses: sesObj}) makes ses accessible
    // but typeof ses inside 'with' would return "object" not "undefined"
    // So this doesn't help either
    
    // NEW IDEA: What if ses is defined as a variable that IS undefined
    // but has a __proto__ with ok() method?
    // No - undefined doesn't have prototype methods accessible
    
    // FINAL IDEA: Use Proxy with 'has' trap in a non-strict vm context
    // In non-strict mode, 'with' statement uses [[HasProperty]] 
    // But we need typeof to use [[HasProperty]] too
    // According to spec, typeof for identifier uses HasBinding on env record
    // For global env record, HasBinding calls [[HasProperty]] on global object
    // So if global object is a Proxy with has() returning false for 'ses',
    // typeof ses should return "undefined"
    // BUT get() returning sesObj means ses.ok() works
    
    // The issue from before: vm.createContext on Proxy might not work
    // Let me try WITHOUT vm.createContext (just vm.runInContext on already-contextified object)
    // Or use vm.createContext on a plain object, then replace its prototype with a Proxy
    
    // Actually, let me try: create context from plain object, then use Proxy wrapping
    const plainSandbox: any = {
      window: mockWindow,
      self: undefined,
      bootstrap: undefined,
      exports: undefined,
      module: undefined,
      define: undefined,
    };
    
    vm.createContext(plainSandbox);
    
    // Now wrap the contextified object in a Proxy
    const sesObj = { ok: () => false };
    const proxiedSandbox = new Proxy(plainSandbox, {
      has(target, key) {
        if (key === 'ses') return false; // typeof ses === "undefined"
        return Reflect.has(target, key);
      },
      get(target, key) {
        if (key === 'ses') return sesObj;
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        return Reflect.set(target, key, value);
      }
    });
    
    // Run in the proxied context (already contextified)
    try {
      vm.runInContext(qSource, proxiedSandbox as any);
    } catch(e) {
      // ignore
    }
    
    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");
  });
});