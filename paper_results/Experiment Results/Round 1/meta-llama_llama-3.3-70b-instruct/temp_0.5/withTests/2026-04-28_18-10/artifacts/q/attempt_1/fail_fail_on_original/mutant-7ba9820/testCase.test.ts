import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should test the behavior of the mutated file", () => {
        // Test that the Promise.prototype.ninvoke function is defined and callable.
        expect(Promise.prototype.ninvoke).toBeDefined();
        expect(typeof Promise.prototype.ninvoke).toBe("function");

        // Test that the Promise.prototype.ninvoke function throws an error when called.
        expect(() => Promise.prototype.ninvoke()).toThrowError();
    });
});