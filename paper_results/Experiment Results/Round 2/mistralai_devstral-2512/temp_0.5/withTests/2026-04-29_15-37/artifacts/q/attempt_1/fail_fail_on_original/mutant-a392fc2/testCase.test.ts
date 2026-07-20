import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.fin", () => {
    it("should throw an error when callback is not a function", () => {
        const promise = Q.resolve(42);
        expect(() => {
            promise.fin("not a function");
        }).toThrow("Q can't apply finally callback");
    });
});