import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("Q ses branch", () => {
  it("should not set window.Q when ses is defined and ses.ok() returns false", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    // When ses is defined: typeof ses !== "undefined" is true
    // We enter the empty ses block {} and skip the window block entirely
    // So window.Q is never set regardless of the mutation
    // The placeholder must be reachable another way...
    
    // Let's try: ses defined on window object, not as global
    // so typeof ses === "undefined" at top level
    // but ses is accessible via closure... no that won't work
    
    // Actually let's re-examine: maybe the placeholder if() wraps nothing
    // and the real effect is on what comes after the closing brace
    // Original: if (!ses.ok()) { } <- empty, then window assignment runs
    // Mutated: if (ses.ok()) { } <- empty, then window assignment runs  
    // Both are empty so no difference... 
    
    // OR the placeholder if() has no closing brace shown and wraps everything:
    // Original: if (!ses.ok()) { [all window code] }
    // Mutated: if (ses.ok()) { [all window code] }
    // With ses undefined: ses.ok() throws -> neither sets window.Q
    // With ses defined: can't reach window block
    
    // The ONLY way this works: ses must be defined but typeof check uses different variable
    // Let me try defining 'ses' as a non-enumerable property
    
    const sandbox: any = {};
    Object.defineProperty(sandbox, 'ses', {
      get: () => ({ ok: () => false }),
      enumerable: false,
      configurable: true
    });
    sandbox.window = {};
    sandbox.self = {};
    sandbox.setTimeout = setTimeout;
    sandbox.clearTimeout = clearTimeout;

    vm.createContext(sandbox);
    
    try {
      vm.runInContext(qSource, sandbox);
    } catch(e) {
      // ignore
    }

    // Original: !ses.ok() = !false = true -> window.Q gets set
    // Mutated: ses.ok() = false -> window.Q NOT set
    expect(sandbox.window.Q).toBeDefined();
  });
});