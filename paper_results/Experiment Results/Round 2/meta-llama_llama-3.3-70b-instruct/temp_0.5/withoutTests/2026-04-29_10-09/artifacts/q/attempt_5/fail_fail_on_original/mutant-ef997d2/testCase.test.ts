import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should return the inspected value of an object when using Q.master with a fallback function", () => {
        const object = { foo: "bar" };
        const fallback = function (op: string, args: any[]) {
            return Q(object).inspect();
        };
        const promise = Q.master(object, fallback);
        expect(promise.inspect).toBeDefined();
    });
});