import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should return the inspected value of an object", () => {
        const object = { foo: "bar" };
        const promise = Q(object);
        const inspected = promise.inspect();
        expect(inspected.state).toBe("fulfilled");
        expect(inspected.value).toEqual(object);
    });
});