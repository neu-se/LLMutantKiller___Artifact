describe("Q.async function", () => {
    it("should handle ES6 generators correctly", async () => {
        function* generator() {
            yield Promise.resolve(1);
            yield Promise.resolve(2);
        }

        const asyncGenerator = (function(makeGenerator) {
            return function () {
                var generator = makeGenerator.apply(this, arguments);
                var callback = function (value) {
                    return value;
                };
                var errback = function (error) {
                    throw error;
                };
                var result;
                try {
                    result = generator.next();
                } catch (exception) {
                    return Promise.reject(exception);
                }
                if (result.done) {
                    return Promise.resolve(result.value);
                } else {
                    return Promise.resolve(result.value).then(callback, errback).then(function (value) {
                        return asyncGenerator();
                    });
                }
            };
        })(generator);
        const result = await asyncGenerator();
        expect(result).toBeUndefined();
    });
});