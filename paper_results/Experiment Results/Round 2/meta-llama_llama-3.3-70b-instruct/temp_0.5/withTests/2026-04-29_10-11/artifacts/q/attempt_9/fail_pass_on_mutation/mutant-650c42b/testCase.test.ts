import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("dispatch function", () => {
    it("should dispatch a message to an object", () => {
        const object = {
            foo: () => "bar"
        };

        const result = q(object).dispatch("foo", []);
        expect(result).not.toBeUndefined();
    });
});