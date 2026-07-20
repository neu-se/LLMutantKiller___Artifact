import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
    it("should dispatch 'set' with the correct arguments", () => {
        const object = {};
        const key = "testKey";
        const value = "testValue";

        const promise = Q(object).dispatch("set", [key, value]);

        expect(promise.inspect().state).toBe("fulfilled");
        expect(object[key]).toBe(value);
    });
});