describe("Q.promised", () => {
    it("should pass the correct number of arguments to the callback", () => {
        const Q = {
            promised: function(callback) {
                return function() {
                    return spread([this, all(arguments)], function (self, args) {
                        return callback.apply(self, args);
                    });
                }
            },
            spread: function(arr, callback) {
                return callback.apply(null, arr);
            },
            all: function(arr) {
                return arr;
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
        const Q = {
            promised: function(callback) {
                return function() {
                    return spread([], function (self, args) {
                        return callback.apply(self, args);
                    });
                }
            },
            spread: function(arr, callback) {
                return callback.apply(null, arr);
            }
        };

        const callback = jest.fn();
        const promisedCallback = Q.promised(callback);
        const context = { foo: "bar" };
        const args = [1, 2, 3];
        promisedCallback.apply(context, args);
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback.mock.calls[0].length).toBe(0); // no arguments
    });
});