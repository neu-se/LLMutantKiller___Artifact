import * as vm from "vm";
import * as fs from "fs";
import * as path from "path";

describe("Q CommonJS loading condition", () => {
  it("requires exports to be an object to load via CommonJS branch", () => {
    const qSource = fs.readFileSync(
      path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"),
      "utf8"
    );

    const fakeModule: { exports: any } = { exports: {} };
    const context = vm.createContext({
      exports: "not-an-object",
      module: fakeModule,
      process: process,
      setTimeout: setTimeout,
      clearTimeout: clearTimeout,
      setImmediate: typeof setImmediate !== "undefined" ? setImmediate : undefined,
    });

    let threw = false;
    try {
      vm.runInContext(qSource, context);
    } catch (e) {
      threw = true;
    }

    // Original code: typeof exports === "object" is false for string "not-an-object"
    // → skips CommonJS branch → no matching environment → throws error
    // Mutated code: true && typeof module === "object" is true
    // → enters CommonJS branch → sets module.exports = Q → does NOT throw
    expect(threw).toBe(true);
  });
});