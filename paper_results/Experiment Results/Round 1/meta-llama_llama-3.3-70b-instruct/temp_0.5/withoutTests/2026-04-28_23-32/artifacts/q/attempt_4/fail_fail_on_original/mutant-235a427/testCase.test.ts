import { Q } from "./q.js";

describe("Q.promised", () => {
    it("should correctly handle the 'this' context and arguments", () => {
        const callback = jest.fn();
        const promisedCallback = Q.promised(callback);
        const context = { foo: "bar" };
        const args = [1, 2, 3];
        promisedCallback.apply(context, args);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(expect.objectContaining(context), expect.arrayContaining(args));
    });

    it("should pass the correct number of arguments to the callback", () => {
        const callback = jest.fn();
        const promisedCallback = Q.promised(callback);
        const context = { foo: "bar" };
        const args = [1, 2, 3];
        promisedCallback.apply(context, args);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback.mock.calls[0].length).toBe(2); // self and args
    });
});