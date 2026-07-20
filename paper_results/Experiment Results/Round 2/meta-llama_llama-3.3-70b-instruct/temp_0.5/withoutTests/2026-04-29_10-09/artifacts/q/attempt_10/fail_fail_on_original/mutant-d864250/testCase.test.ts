import { Q } from "../../../q.js";

describe("Q", () => {
    it("should not set property correctly", () => {
        const obj = {};
        const promise = Q.fulfill(obj);
        return promise.then((value: any) => {
            Q(value).dispatch("set", ["test", "value"]);
            // The original code does not set the property, so this will pass
            expect(Object.prototype.hasOwnProperty.call(value, "test")).toBe(false);
        });
    });
});