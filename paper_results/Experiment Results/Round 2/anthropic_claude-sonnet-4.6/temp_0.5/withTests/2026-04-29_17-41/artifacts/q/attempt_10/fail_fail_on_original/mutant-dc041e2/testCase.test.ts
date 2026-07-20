import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";

describe("Q ses branch", () => {
  it("should correctly handle ses.ok() check in window context", () => {
    // Read the actual source to understand exact structure
    const qPath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );
    const qSource = fs.readFileSync(qPath, "utf8");

    // Find the placeholder line to understand context
    const lines = qSource.split("\n");
    let placeholderLineIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("ses.ok()")) {
        placeholderLineIndex = i;
        break;
      }
    }

    // Print surrounding lines for debugging
    const context = lines.slice(
      Math.max(0, placeholderLineIndex - 5),
      placeholderLineIndex + 15
    ).join("\n");

    // The mutation is if(!ses.ok()) -> if(ses.ok())
    // Original: if (!ses.ok()) means "if ses is NOT ok, set window.Q"
    // Mutated: if (ses.ok()) means "if ses IS ok, set window.Q"
    //
    // We need ses to be undefined at top-level check but defined inside window block.
    // The only way: ses is defined on the sandbox AFTER module evaluation starts,
    // or ses is defined as a property of an object that becomes the global scope.
    //
    // In VM, the sandbox IS the global. So if ses is on sandbox, typeof ses !== "undefined".
    // 
    // Key insight: what if we use a Proxy for the sandbox that returns "undefined" 
    // for typeof check on ses but returns an object when ses is accessed as a value?
    // typeof uses [[GetOwnProperty]] not [[Get]], so a Proxy with has() returning false
    // but get() returning an object would make typeof return "undefined"!

    const sesObj = { ok: () => false };
    
    const handler = {
      has(target: any, key: string) {
        // Make 'ses' appear to not exist for typeof check
        if (key === "ses") return false;
        return key in target;
      },
      get(target: any, key: string) {
        if (key === "ses") return sesObj;
        return target[key];
      },
      set(target: any, key: string, value: any) {
        target[key] = value;
        return true;
      }
    };

    const target: any = {
      window: {},
      self: {},
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
    };

    const sandboxProxy = new Proxy(target, handler);
    vm.createContext(sandboxProxy);
    vm.runInContext(qSource, sandboxProxy);

    // Original: typeof ses === "undefined" (has returns false) -> enter window block
    // Inside window block: ses.ok() returns false -> !false = true -> set window.Q
    // Mutated: ses.ok() returns false -> false -> skip -> throw error or not set window.Q
    expect(target.window.Q).toBeDefined();
    expect(typeof target.window.Q).toBe("function");
  });
});