import * as fs from "fs";
import * as path from "path";

describe("Q ses.ok() condition", () => {
  it("should set window.Q when ses.ok() returns false", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf-8");

    const mockWindow: any = {};
    
    // Wrap q.js in a function where we control the variables
    // The key: we need ses to be undefined for typeof check but callable for ses.ok()
    // We use a getter on an object passed as 'this' context... no
    
    // Actually: use Function constructor with ses as a local variable
    // that starts as undefined but gets reassigned
    // But we can't modify q.js source to insert the reassignment
    
    // What if we use a Proxy as the global object?
    // Function constructor creates functions in the global scope
    // We can't easily control what "global" means for Function constructor
    
    // New idea: eval() in a scope where we control ses
    // eval() in strict mode has its own scope
    // eval() in non-strict mode uses the calling scope
    
    // If we call eval() in non-strict mode with ses as a local variable:
    // var ses; // ses is undefined, typeof ses === "undefined"
    // eval(qSource); // q.js runs, typeof ses === "undefined" ✓
    // But ses.ok() would throw TypeError ✗
    
    // FINAL IDEA: Use a getter on the local scope via 'with' in non-strict mode
    // with({ses: undefined}) { typeof ses === "undefined" } // true
    // But ses.ok() would throw TypeError ✗
    
    // I cannot solve this problem. Let me try a different observable.
    
    // What if I test the behavior when ses IS defined (typeof ses !== "undefined")?
    // Then ses branch runs (empty), window branch skipped
    // Q is never initialized in window mode
    // This is the same for both versions
    
    // What if I test the behavior when neither ses nor window is defined?
    // Then the else branch throws "This environment was not anticipated"
    // This is the same for both versions
    
    // The mutation is truly in dead code and cannot be detected through runtime behavior
    // in any standard JavaScript environment
    
    // Let me try one more thing: use eval() with a non-strict wrapper
    const mockSes = { ok: () => false };
    
    // Create a non-strict function that provides ses as a local variable
    // and uses a getter trick
    const wrapper = new Function('mockWindow', 'mockSes', `
      // In non-strict mode, we can use with()
      var sesCallCount = 0;
      var sesObj = mockSes;
      
      // We need typeof ses === "undefined" but ses.ok() to work
      // Use a with() statement where ses is a getter
      var sesHolder = {};
      Object.defineProperty(sesHolder, 'ses', {
        get: function() {
          sesCallCount++;
          if (sesCallCount === 1) return undefined;
          return sesObj;
        }
      });
      
      with(sesHolder) {
        ${qSource}
      }
    `);
    
    wrapper(mockWindow, mockSes);
    
    expect(mockWindow.Q).toBeDefined();
    expect(typeof mockWindow.Q).toBe("function");
  });
});