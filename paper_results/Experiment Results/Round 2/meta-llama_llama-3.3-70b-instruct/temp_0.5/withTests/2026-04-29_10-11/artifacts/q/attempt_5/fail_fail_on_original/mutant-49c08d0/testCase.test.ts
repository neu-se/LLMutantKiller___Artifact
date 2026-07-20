import { Q } from "../../../q.js";

describe("Promise", () => {
    it("should inspect a promise", () => {
        const promise = Q(10);
        expect(promise.inspect()).toEqual({ state: "fulfilled", value: 10 });
    });
});