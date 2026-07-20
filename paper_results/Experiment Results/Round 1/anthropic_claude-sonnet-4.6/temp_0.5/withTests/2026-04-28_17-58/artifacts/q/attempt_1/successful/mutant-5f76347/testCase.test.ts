import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete with key argument", () => {
  it("should delete the specified property from an object using Q.delete", async () => {
    const object = { a: 10, b: 20 };
    
    await Q.delete(object, "a");
    
    expect("a" in object).toBe(false);
    expect(object.b).toBe(20);
  });
});