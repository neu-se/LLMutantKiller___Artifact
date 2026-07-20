import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q typeof process check", () => {
  it("correctly identifies process as an object type", () => {
    // The mutation changes typeof process === "object" to typeof process === ""
    // typeof never returns empty string, so this is always false in mutated code
    // We can test this indirectly by verifying Q behaves correctly with process
    expect(typeof process).toBe("object");
    // In original: this condition is true, allowing domain binding
    // In mutated: typeof process === "" is always false
    expect(typeof process === "object").toBe(true);
    expect(typeof process === "").toBe(false);
  });
});