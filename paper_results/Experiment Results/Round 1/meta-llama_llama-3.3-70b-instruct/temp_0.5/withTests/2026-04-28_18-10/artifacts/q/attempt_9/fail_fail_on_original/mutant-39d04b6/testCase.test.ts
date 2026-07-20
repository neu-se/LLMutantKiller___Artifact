import { Q } from "../../../../../q.js";

describe("Promise", () => {
    it("should inspect a promise with a defined inspect function", () => {
        const promise = Q({
            inspect: function () {
                return { state: "unknown" };
            }
        });

        expect(promise.inspect()).toEqual({ state: "unknown" });
    });
});