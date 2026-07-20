import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("dispatch function", () => {
    it("should dispatch a message to an object", () => {
        const object = {
            foo: () => "bar"
        };

        const result = Q(object).dispatch("foo");
        expect(result).toBe("bar");
    });
});