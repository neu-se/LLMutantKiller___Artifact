import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("ses.makeQ returns working Q library", () => {
  it("ses.makeQ() returns Q with defer that creates resolvable promises", async () => {
    const modulePath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const code = fs.readFileSync(modulePath, "utf-8");

    const sesObj: { ok: () => boolean; makeQ?: () => any } = {
      ok: () => true,
    };

    const context = vm.createContext({
      ses: sesObj,
      setTimeout,
      clearTimeout,
      setImmediate,
      process,
      console,
    });

    vm.runInContext(code, context);

    expect(typeof sesObj.makeQ).toBe("function");
    const Q = sesObj.makeQ!();
    
    // Test that the Q library actually works
    const deferred = Q.defer();
    deferred.resolve(42);
    
    const result = await deferred.promise;
    expect(result).toBe(42);
  });
});