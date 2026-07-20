import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.keys", () => {
  it("should return own property keys of an object with inherited properties", async () => {
    function Base() {}
    Base.prototype.inheritedProp = "inherited";
    
    const obj = new (Base as any)();
    obj.ownProp1 = "value1";
    obj.ownProp2 = "value2";

    const keys = await Q.keys(obj);
    expect(keys.sort()).toEqual(["ownProp1", "ownProp2"]);
  });
});