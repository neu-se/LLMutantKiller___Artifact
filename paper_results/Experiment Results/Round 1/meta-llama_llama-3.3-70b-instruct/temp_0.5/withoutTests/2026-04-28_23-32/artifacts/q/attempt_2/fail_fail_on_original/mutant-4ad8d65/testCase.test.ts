import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should throw an error when dispatching an empty string", () => {
        const object = {};
        const promise = Q(object);
        expect(() => promise.dispatch("", [])).toThrowError();
    });
});