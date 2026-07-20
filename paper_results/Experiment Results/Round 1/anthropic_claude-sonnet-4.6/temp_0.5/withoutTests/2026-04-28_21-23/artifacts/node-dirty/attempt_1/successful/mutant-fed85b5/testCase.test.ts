import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe("Dirty forEach break behavior", () => {
  it("should stop iteration when callback returns false, not when it returns true", (done) => {
    const db = new Dirty(null);

    db.on("load", () => {
      db.set("a", 1);
      db.set("b", 2);
      db.set("c", 3);

      const visited: string[] = [];

      // Return false after first key to break early
      db.forEach((key: string, val: number) => {
        visited.push(key);
        return false; // Should break iteration in original code
      });

      // In original code: breaks on false, so only 1 key visited
      // In mutated code: breaks on true (false !== true), so all 3 keys visited
      expect(visited.length).toBe(1);
      done();
    });
  });
});