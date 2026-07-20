import { Q } from "./q.js";

describe("Q.promised", () => {
    it("should correctly handle the 'this' context and arguments", () => {
        const callback = jest.fn();
        const promisedCallback = Q.promised(callback);
        const context = { foo: "bar" };
        const args = [1, 2, 3];
        promisedCallback.apply(context, args);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(context, args);
    });

    it("should pass the correct arguments to the callback", () => {
        const callback = jest.fn();
        const promisedCallback = Q.promised(callback);
        const context = { foo: "bar" };
        const args = [1, 2, 3];
        promisedCallback.apply(context, args);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(context, args);
    });
});