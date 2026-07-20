import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q module loads correctly via CommonJS", () => {
  it("should export a callable Q function that creates fulfilled promises", () => {
    // If the mutation is active (if (false) instead of if (typeof bootstrap === "function")),
    // the module still loads via CommonJS (the else if branch), so Q should be defined.
    // The key behavior we test is that Q is properly exported and functional.
    expect(typeof Q).toBe("function");
    
    // Test basic promise creation - this verifies the module exported correctly
    const promise = Q(42);
    expect(promise).toBeDefined();
    expect(typeof promise.then).toBe("function");
    
    // Verify the promise is fulfilled with the correct value
    const inspected = promise.inspect();
    expect(inspected.state).toBe("fulfilled");
    expect(inspected.value).toBe(42);
    
    // Verify Q.defer works
    const deferred = Q.defer();
    expect(deferred).toBeDefined();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");
    expect(typeof deferred.promise).toBe("object");
    
    // The mutation changes `if (typeof bootstrap === "function")` to `if (false)`.
    // In a Node.js environment, the CommonJS branch handles loading, so the module
    // still works. However, we need a test that distinguishes the original from mutant.
    // 
    // The original code: if (typeof bootstrap === "function") { bootstrap("promise", definition); }
    // The mutant code:   if (false) { bootstrap("promise", definition); }
    //
    // In Node.js, both load via CommonJS. The observable difference would only matter
    // in a Montage Require environment where `bootstrap` is defined.
    // 
    // Since we're in Node.js, we verify the module loads and works correctly,
    // which passes for both. But we need to detect the mutation.
    //
    // The mutation is a conditional change. We can test that the module exports
    // are correct and that Q functions work as expected - the test passes on original
    // and should also pass on mutant since both use CommonJS in Node.js.
    //
    // To actually kill the mutant, we simulate the bootstrap environment:
    const bootstrapCalled: { called: boolean; name: string | null } = { called: false, name: null };
    
    // Save and mock global bootstrap
    const globalAny = global as any;
    const originalBootstrap = globalAny.bootstrap;
    
    globalAny.bootstrap = function(name: string, definition: Function) {
      bootstrapCalled.called = true;
      bootstrapCalled.name = name;
    };
    
    // Re-require the module to trigger the bootstrap check
    // Clear the module cache first
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    delete require.cache[modulePath];
    
    require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Restore
    if (originalBootstrap === undefined) {
      delete globalAny.bootstrap;
    } else {
      globalAny.bootstrap = originalBootstrap;
    }
    
    // Clean up cache again
    delete require.cache[modulePath];
    
    // In the original code, bootstrap should have been called because
    // `typeof bootstrap === "function"` is true when bootstrap is defined.
    // In the mutant code, `if (false)` means bootstrap is never called.
    expect(bootstrapCalled.called).toBe(true);
    expect(bootstrapCalled.name).toBe("promise");
  });
});