import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get functionality", () => {
    it("should return a promise for the property value", () => {
        const object = { a: 1 };
        const result = q.get(object, "a");
        expect(typeof result.then).toBe('function');
    });
});