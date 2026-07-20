import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
  it("should correctly handle objects with both own and inherited properties", () => {
    const proto = { inherited: "value" };
    const obj = Object.create(proto);
    obj.own1 = "value1";
    obj.own2 = "value2";

    return Q.keys(obj).then((keys: string[]) => {
      expect(keys).toEqual(["own1", "own2"]);
      expect(keys.length).toBe(2);
    });
  });
});