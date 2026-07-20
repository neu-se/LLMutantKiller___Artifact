import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a 'delete' method that throws an error when given an empty string", () => {
        const obj = { a: 1, b: 2 };
        expect(() => Q(obj)["delete"]("")).toThrowError();
    });
});