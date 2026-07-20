import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys behavior", () => {
  it("should return the keys of a fulfilled promise object via Q.keys", async () => {
    // object_keys is used in the 'keys' operation of fulfill()
    // The mutation removes keys.push(key), making object_keys return []
    const obj = { a: 1, b: 2, c: 3 };
    const result = await Q(obj).keys();
    
    expect(result).toHaveLength(3);
    expect(result).toContain("a");
    expect(result).toContain("b");
    expect(result).toContain("c");
  });
});