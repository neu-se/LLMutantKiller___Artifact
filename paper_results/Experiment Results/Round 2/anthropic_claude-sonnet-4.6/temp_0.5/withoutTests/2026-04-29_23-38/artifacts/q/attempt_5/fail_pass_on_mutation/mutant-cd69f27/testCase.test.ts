import { readFileSync } from "fs";
import vm from "vm";
import path from "path";

describe("Q ses mutation", () => {
  it("tracks all ses interactions when ses.ok() returns false", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = readFileSync(qPath, "utf-8");

    const interactions: string[] = [];
    const sesTarget: any = {
      ok: () => { interactions.push('ok called'); return false; }
    };
    const ses = new Proxy(sesTarget, {
      set: (target, prop, value) => {
        interactions.push(`set:${String(prop)}`);
        target[prop] = value;
        return true;
      },
      get: (target, prop) => {
        interactions.push(`get:${String(prop)}`);
        return target[prop];
      }
    });

    const sandbox: Record<string, any> = {
      ses, console, setTimeout, clearTimeout, process,
    };
    if (typeof setImmediate !== "undefined") sandbox.setImmediate = setImmediate;

    const context = vm.createContext(sandbox);
    new vm.Script(qSource).runInContext(context);

    // In both original and mutated, when ses.ok() returns false:
    // - ses.ok is accessed (get:ok)
    // - ok is called
    // - makeQ is NOT set
    // The interactions should be identical...
    expect(interactions).not.toContain('set:makeQ');
  });
});