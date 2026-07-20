describe("Q promise library", () => {
    it("should create a promise", () => {
        // Create a new promise
        const promise = (function (definition) {
            "use strict";
            return definition();
        })(function () {
            "use strict";
            return {
                resolve: function (value) {
                    return Promise.resolve(value);
                }
            };
        }).resolve("Test");

        // Wait for the promise to be fulfilled
        return promise.then((value: any) => {
            expect(value).toBe("Test");
        });
    });
});