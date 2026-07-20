import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe("close() on transient db (no path)", () => {
  it("should not throw when closing a transient database with no write stream", (done) => {
    const db = new (Dirty as any)();
    db.on("load", () => {
      // In transient mode, _writeStream is null.
      // Original code: `if (this._writeStream)` guards the call, so no error.
      // Mutated code: `if (true)` calls end() on null, throwing TypeError.
      expect(() => db.close()).not.toThrow();
      done();
    });
  });
});