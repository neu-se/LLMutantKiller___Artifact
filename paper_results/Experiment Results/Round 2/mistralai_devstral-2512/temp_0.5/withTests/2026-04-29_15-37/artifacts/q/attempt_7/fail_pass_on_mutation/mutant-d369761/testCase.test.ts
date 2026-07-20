import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
    it("should only return own enumerable properties and exclude inherited ones", async () => {
        const parent = { inherited: "value" };
        const child = Object.create(parent);
        child.own1 = "value1";
        child.own2 = "value2";

        const keys = await Q.keys(child);

        expect(keys).toEqual(["own1", "own2"]);
        expect(keys.length).toBe(2);
        expect(keys.includes("inherited")).toBe(false);
    });
});