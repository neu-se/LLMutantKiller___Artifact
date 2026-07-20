import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should throw an error when Q.master is called with an empty fallback function", () => {
        const object = { foo: "bar" };
        const fallback = function (op: string, args: any[]) {
            // do nothing
        };
        expect(() => Q.master(object, fallback)).toThrowError();
    });
});