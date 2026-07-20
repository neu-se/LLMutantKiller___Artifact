import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should throw an error when creating a promise with an undefined inspect function", () => {
        expect(() => Q.Promise({}, function () {
            return Q.reject(new Error("Test"));
        }, undefined)).toThrowError();
    });
});