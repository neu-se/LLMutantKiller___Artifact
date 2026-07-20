import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should return a promise when Q.master is called with an object", () => {
        const object = { foo: "bar" };
        const promise = Q.master(object);
        expect(promise).toBeDefined();
        expect(typeof promise.then).toBe("function");
    });
});