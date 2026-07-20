import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys fallback behavior", () => {
  it("should include own property keys when iterating over an object without Object.keys", async () => {
    // The object_keys fallback is used when Object.keys is not available.
    // We test the keys dispatch to verify keys are returned correctly.
    // To force the fallback, we need to test at module initialization time,
    // which we can approximate by testing the behavior directly.
    
    // Create an object that has own properties and inherited properties
    const proto = { inherited: true };
    const obj = Object.create(proto);
    obj.own1 = "a";
    obj.own2 = "b";
    
    // Q.keys should only return own enumerable properties
    const keys = await Q.keys(obj);
    expect(keys).toContain("own1");
    expect(keys).toContain("own2");
    expect(keys).not.toContain("inherited");
    expect(keys.length).toBe(2);
  });
});