import { readFileSync } from "fs";
import { join, resolve } from "path";

describe("Q module browser environment branch", () => {
  it("should initialize Q on self when window is undefined but self is defined, without throwing", () => {
    const qPath = resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const qSource = readFileSync(qPath, "utf-8");

    // Create a function that runs Q's IIFE in a controlled environment
    // where CommonJS/RequireJS are NOT available, but `self` IS defined
    // This exercises the `typeof window !== "undefined" || typeof self !== "undefined"` branch
    const mockSelf: { Q?: any; [key: string]: any } = {};

    // We override the globals so the CommonJS branch is skipped
    // and the browser/self branch is reached
    const fn = new Function(
      "self",
      "exports",
      "module",
      "define",
      "bootstrap",
      "ses",
      "window",
      `
      ${qSource}
      return self.Q;
      `
    );

    // Pass mockSelf as 'self', and undefined for everything else
    // In original: the `typeof self !== "undefined"` branch is taken → Q set on self
    // In mutated: `false` branch → falls to throw → Error thrown
    let result: any;
    expect(() => {
      result = fn(mockSelf, undefined, undefined, undefined, undefined, undefined, undefined);
    }).not.toThrow();

    expect(typeof result).toBe("function");
  });
});