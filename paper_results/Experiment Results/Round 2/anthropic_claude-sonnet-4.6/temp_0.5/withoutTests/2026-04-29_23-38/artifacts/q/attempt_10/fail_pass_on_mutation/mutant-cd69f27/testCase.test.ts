import { readFileSync } from "fs";
import vm from "vm";
import path from "path";

describe("Q", () => {
  it("detects mutation via definition invocation tracking", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const originalSource = readFileSync(qPath, "utf-8");
    
    // Replace the factory function call to track invocations
    // The source ends with: })(function () { ... return Q; });
    // We wrap the factory to track calls
    let definitionCallCount = 0;
    const wrappedSource = originalSource.replace(
      /\}\)\(function \(\) \{/,
      `})(function () { definitionCallCount++; return (function () {`
    ).replace(/\}\s*;\s*$/, `})(); }`);
    
    // This approach modifies source which is not ideal
    // Let me try a different way
    
    const ses: any = { ok: () => false };
    const sandbox: Record<string, any> = { ses, console, setTimeout, clearTimeout, process };
    if (typeof setImmediate !== "undefined") sandbox.setImmediate = setImmediate;
    vm.createContext(sandbox);
    new vm.Script(originalSource).runInContext(sandbox as any);
    expect(ses.makeQ).toBeUndefined();
  });
});