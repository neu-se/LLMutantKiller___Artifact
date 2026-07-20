import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
  it("should return empty array for object with only inherited properties", () => {
    const proto = { inherited1: "value1", inherited2: "value2" };
    const obj = Object.create(proto);

    return Q.keys(obj).then((keys: string[]) => {
      expect(keys).toEqual([]);
      expect(keys.length).toBe(0);
    });
  });
});