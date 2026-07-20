import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("object_keys mutation test", () => {
    it("should only include own properties and exclude inherited ones", async () => {
        const parent = { inheritedProp: "inherited" };
        const child = Object.create(parent);
        child.ownProp = "own";

        const keys = await Q.keys(child);

        expect(keys).toEqual(["ownProp"]);
        expect(keys.length).toBe(1);
        expect(keys.includes("inheritedProp")).toBe(false);
    });
});