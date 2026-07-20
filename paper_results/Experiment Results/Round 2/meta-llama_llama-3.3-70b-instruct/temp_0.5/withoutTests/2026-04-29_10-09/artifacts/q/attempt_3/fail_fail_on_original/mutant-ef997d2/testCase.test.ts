import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should throw an error when Q.master is called without a fallback function", () => {
        const object = { foo: "bar" };
        expect(() => Q.master(object)).toThrowError();
    });
});