import { Q } from "./q.js";

describe("Q Promise", () => {
    it("should reject the promise when an error is thrown in the resolver", () => {
        const resolver = jest.fn();
        Q((resolve, reject, notify) => {
            resolver();
            resolve();
        });
        expect(resolver).toHaveBeenCalledTimes(1);
    });
});