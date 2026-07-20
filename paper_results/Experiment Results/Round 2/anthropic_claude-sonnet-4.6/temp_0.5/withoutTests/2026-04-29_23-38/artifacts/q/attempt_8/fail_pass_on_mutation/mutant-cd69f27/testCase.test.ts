import { readFileSync } from "fs";
import vm from "vm";
import path from "path";

describe("Q window environment when ses not defined", () => {
  it("should set window.Q when window is defined and ses is not", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = readFileSync(qPath, "utf-8");

    const windowObj: any = {};
    const sandbox: Record<string, any> = {
      window: windowObj,
      console, setTimeout, clearTimeout, process,
    };
    if (typeof setImmediate !== "undefined") sandbox.setImmediate = setImmediate;
    vm.createContext(sandbox);
    new vm.Script(qSource).runInContext(sandbox as any);

    expect(typeof windowObj.Q).toBe("function");
  });
});