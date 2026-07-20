import { readFileSync } from "fs";
import vm from "vm";
import path from "path";

describe("Q allSettled", () => {
  it("should settle all promises", async () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = readFileSync(qPath, "utf-8");

    const mod = { exports: {} as any };
    const sandbox: Record<string, any> = {
      module: mod, exports: mod.exports,
      console, setTimeout, clearTimeout, process,
    };
    if (typeof setImmediate !== "undefined") sandbox.setImmediate = setImmediate;
    vm.createContext(sandbox);
    new vm.Script(qSource).runInContext(sandbox as any);
    const Q = mod.exports;

    const results = await Q.allSettled([Q(1), Q.reject(new Error("fail")), Q(3)]);
    expect(results[0].state).toBe("fulfilled");
    expect(results[0].value).toBe(1);
    expect(results[1].state).toBe("rejected");
    expect(results[2].state).toBe("fulfilled");
    expect(results[2].value).toBe(3);
  });
});