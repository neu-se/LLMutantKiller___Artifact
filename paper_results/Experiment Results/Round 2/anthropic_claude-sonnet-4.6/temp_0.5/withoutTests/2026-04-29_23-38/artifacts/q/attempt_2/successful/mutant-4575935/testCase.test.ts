import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q browser global assignment branch", () => {
  it("should assign Q to window global when window is defined and CommonJS is not available", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = fs.readFileSync(qPath, "utf8");
    
    // Create a sandbox that looks like a browser environment:
    // - has window/self but no module/exports/define/ses
    // - no CommonJS, no RequireJS, no SES
    const sandbox: Record<string, unknown> = {
      window: {},
      self: {},
      // explicitly no: bootstrap, exports, module, define, ses
    };
    
    vm.createContext(sandbox);
    
    // In original code: window.Q gets assigned
    // In mutated code: throws "This environment was not anticipated by Q"
    expect(() => {
      vm.runInContext(qSource, sandbox);
    }).not.toThrow();
    
    // Additionally verify Q was actually assigned to window
    expect(sandbox.window).toHaveProperty("Q");
    expect(typeof (sandbox.window as Record<string, unknown>).Q).toBe("function");
  });
});