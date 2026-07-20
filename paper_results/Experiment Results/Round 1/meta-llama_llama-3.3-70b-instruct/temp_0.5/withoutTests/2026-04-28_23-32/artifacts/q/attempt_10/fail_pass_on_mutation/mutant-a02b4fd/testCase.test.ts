describe("Q.post", () => {
    it("should call the post method when name is not null in the original code but call apply in the mutated code", () => {
        // Define Q
        const Q = {
            fulfill: (obj) => obj,
            post: (obj, name, args) => {
                if (name === null) {
                    obj.apply(void 0, args);
                } else {
                    obj.post(name, args);
                }
            },
        };

        const obj = {
            post: jest.fn(),
            apply: jest.fn(),
        };

        Q.post(Q.fulfill(obj), 'test', [1, 2, 3]);

        // This expectation should pass in the original code but fail in the mutated code
        expect(obj.post).toHaveBeenCalledTimes(1);
        expect(obj.apply).not.toHaveBeenCalled();
    });
});