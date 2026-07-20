import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect with unknown state", () => {
  it("should return state 'unknown' when inspect is not provided to Promise constructor", () => {
    const obj = { foo: "bar" };
    // Q.master creates a Promise without an inspect function
    // In original code, inspect returns {state: "unknown"}
    // In mutated code, inspect returns undefined, causing errors
    const masterPromise = Q.master(obj);
    const inspected = masterPromise.inspect();
    expect(inspected).toBeDefined();
    expect(inspected.state).toBe("unknown");
  });
});