describe("Q.promised", () => {
    it("should pass the correct number of arguments to the callback", () => {
        const Q = {
            promised: function(callback: Function) {
                return function(...args: any[]) {
                    return callback.apply(this, args);
                }
            }
        };

        const callback = jest.fn();
        const promisedCallback = Q.promised(callback);
        const context = { foo: "bar" };
        const args = [1, 2, 3];
        promisedCallback.apply(context, args);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback.mock.calls[0].length).toBe(3); // 1, 2, 3
        expect(callback.mock.calls[0][0]).toBe(1);
        expect(callback.mock.calls[0][1]).toBe(2);
        expect(callback.mock.calls[0][2]).toBe(3);
    });

    it("should not pass the correct number of arguments to the callback when mutated", () => {
        const QMutated = {
            promised: function(callback: Function) {
                return function(...args: any[]) {
                    return callback.apply(null, []);
                }
            }
        };

        const callback = jest.fn();
        const promisedCallback = QMutated.promised(callback);
        const context = { foo: "bar" };
        const args = [1, 2, 3];
        promisedCallback.apply(context, args);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback.mock.calls[0].length).toBe(0); // no arguments
    });
});