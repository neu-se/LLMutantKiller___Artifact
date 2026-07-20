import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
  it("should delete a property from an object and return a promise for the result", async () => {
    const obj = { a: 1, b: 2 };
    const result = await Q["delete"](obj, "a");
    // The delete operation should have been dispatched and the property should be deleted
    expect(obj.hasOwnProperty("a")).toBe(false);
  });
});