describe("Q.post", () => {
    it("should call the post method when name is null", () => {
        const obj = {
            post: jest.fn(),
            apply: jest.fn(),
        };

        // assuming Q is defined in the scope
        Q.fulfill(obj).post(null, [1, 2, 3]);

        expect(obj.apply).toHaveBeenCalledTimes(1);
    });

    it("should call the post method when name is not null in the original code but call apply in the mutated code", () => {
        const obj = {
            post: jest.fn(),
            apply: jest.fn(),
        };

        // assuming Q is defined in the scope
        Q.fulfill(obj).post('test', [1, 2, 3]);

        expect(obj.post).toHaveBeenCalledTimes(1);
        expect(obj.apply).not.toHaveBeenCalled();
    });
});