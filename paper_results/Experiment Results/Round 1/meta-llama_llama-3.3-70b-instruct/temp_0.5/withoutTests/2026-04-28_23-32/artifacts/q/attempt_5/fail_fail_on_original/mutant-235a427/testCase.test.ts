import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.promised", () => {
    it("should pass the correct number of arguments to the callback", () => {
        const callback = jest.fn();
        const promisedCallback = Q.promised(callback);
        const context = { foo: "bar" };
        const args = [1, 2, 3];
        promisedCallback.apply(context, args);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback.mock.calls[0].length).toBe(2); // self, args
        expect(callback.mock.calls[0][0]).toBe(context);
        expect(callback.mock.calls[0][1]).toEqual(args);
    });
});