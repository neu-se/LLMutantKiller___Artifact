import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe("Dirty close() without path", () => {
  it("should not throw when close() is called on a Dirty instance with no path", (done) => {
    const db = new Dirty(undefined);

    db.on('load', () => {
      // After load, close should not throw even though _writeStream is null
      expect(() => {
        db.close();
      }).not.toThrow();
      done();
    });
  });
});