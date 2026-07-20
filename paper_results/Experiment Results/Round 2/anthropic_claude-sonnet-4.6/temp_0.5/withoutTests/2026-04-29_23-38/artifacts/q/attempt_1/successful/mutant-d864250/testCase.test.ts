import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set behavior", () => {
  it("should set a property on the fulfilled value via Q.set", async () => {
    const obj: { [key: string]: any } = { existing: "value" };
    const promise = Q(obj);
    
    await Q.set(promise, "newProp", "newValue");
    
    expect(obj.newProp).toBe("newValue");
  });
});