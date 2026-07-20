describe("Q.post", () => {
    it("should call the post method when name is not null in the original code but call apply in the mutated code", () => {
        const Q = require('./q.js');
        const obj = {
            post: jest.fn(),
            apply: jest.fn(),
        };

        Q.fulfill(obj).post('test', [1, 2, 3]);

        // This expectation should pass in the original code but fail in the mutated code
        expect(obj.post).toHaveBeenCalledTimes(1);
        expect(obj.apply).not.toHaveBeenCalled();
    });
});