import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should return the inspected value of an object when using Q.master", () => {
        const object = { foo: "bar" };
        const promise = Q.master(object);
        expect(promise.inspect).toBeDefined();
        const inspected = promise.inspect();
        expect(inspected).toEqual({ state: "unknown" });
    });
});