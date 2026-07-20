import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe("forEach break behavior", () => {
  it("should continue iterating when callback returns false (not break)", () => {
    const db = new (Dirty as any)();
    db.set("a", 1);
    db.set("b", 2);
    db.set("c", 3);

    const visited: string[] = [];
    db.forEach((key: string, val: number) => {
      visited.push(key);
      return false; // In original: this should NOT break (false !== false... wait)
      // Original: if (fn(key, val) === false) break; => returning false DOES break
      // Mutant: if (fn(key, val) === true) break; => returning false does NOT break
    });

    // In the original code, returning false from forEach breaks the loop early
    // So only the first key should be visited
    expect(visited).toHaveLength(1);
    expect(visited[0]).toBe("a");
  });
});