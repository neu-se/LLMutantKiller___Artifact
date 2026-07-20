import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
  it("should return correct keys for object with mixed property types", () => {
    const obj = Object.create({ inherited: "value" });
    obj.ownString = "string";
    obj.ownNumber = 42;
    obj.ownBool = true;

    return Q.keys(obj).then((keys: string[]) => {
      expect(keys).toEqual(["ownString", "ownNumber", "ownBool"]);
      expect(keys.length).toBe(3);
      expect(keys).not.toContain("inherited");
    });
  });
});