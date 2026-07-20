import { Q } from "../../../../../q";

describe("dispatch function", () => {
    it("should dispatch a message to an object", () => {
        const object = {
            foo: () => "bar"
        };

        const result = Q(object).dispatch("foo", []);
        expect(result).not.toBeUndefined();
    });
});