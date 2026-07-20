import { Promise } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Promise", () => {
    it("should throw an error when inspect is called on a promise with no inspect function", () => {
        const promise = Promise({
            "when": function () {},
            "get": function () {},
            "set": function () {},
            "delete": function () {},
            "post": function () {},
            "apply": function () {},
            "keys": function () {}
        }, function fallback() {
            throw new Error("Fallback function should not be called");
        });
        expect(() => promise.inspect()).toThrowError("Fallback function should not be called");
    });
});