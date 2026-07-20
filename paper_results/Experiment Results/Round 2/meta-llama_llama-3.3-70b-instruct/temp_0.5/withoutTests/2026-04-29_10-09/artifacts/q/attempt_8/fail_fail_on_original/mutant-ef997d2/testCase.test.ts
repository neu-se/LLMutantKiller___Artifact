import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should return a promise when Q.master is called with an object and a fallback function", () => {
        const object = { foo: "bar" };
        const fallback = function (op, args) {
            return Q(object);
        };
        const promise = Q.master(object, fallback);
        expect(promise).toBeDefined();
        expect(typeof promise.then).toBe("function");
    });
});