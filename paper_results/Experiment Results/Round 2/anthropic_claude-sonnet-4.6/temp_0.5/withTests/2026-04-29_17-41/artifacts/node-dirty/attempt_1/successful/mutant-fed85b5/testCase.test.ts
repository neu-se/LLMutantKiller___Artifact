import { Dirty } from "../../../../../../../../../../../subject_repositories/node-dirty/lib/dirty/dirty.js";

describe("forEach break behavior", () => {
  it("should continue iterating when callback returns false, and break when callback returns true", () => {
    const db = new (Dirty as any)();
    db.set("a", 1);
    db.set("b", 2);
    db.set("c", 3);

    const visited: string[] = [];

    // In original code: break when fn returns false
    // In mutated code: break when fn returns true
    // We return false on the first key - original should break after 1, mutant should visit all 3
    db.forEach((key: string, val: number) => {
      visited.push(key);
      return false; // original breaks here; mutant continues
    });

    // Original: breaks after first element, so visited.length === 1
    // Mutant: never breaks (false !== true), so visited.length === 3
    expect(visited.length).toBe(1);
  });
});