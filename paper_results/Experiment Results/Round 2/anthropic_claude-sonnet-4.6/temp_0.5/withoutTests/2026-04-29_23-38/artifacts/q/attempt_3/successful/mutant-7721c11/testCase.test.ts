import { createRequire } from "module";
import { fileURLToPath } from "url";

describe("Q array_indexOf", () => {
  it("should correctly identify promise in rejection tracking", async () => {
    const originalIndexOf = Array.prototype.indexOf;
    (Array.prototype as any).indexOf = undefined;
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    
    (Array.prototype as any).indexOf = originalIndexOf;
    
    Q.resetUnhandledRejections();
    const p = Q.reject(new Error("x"));
    expect(Q.getUnhandledReasons().length).toBe(1);
    p.catch(() => {});
    await new Promise(r => setTimeout(r, 100));
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});