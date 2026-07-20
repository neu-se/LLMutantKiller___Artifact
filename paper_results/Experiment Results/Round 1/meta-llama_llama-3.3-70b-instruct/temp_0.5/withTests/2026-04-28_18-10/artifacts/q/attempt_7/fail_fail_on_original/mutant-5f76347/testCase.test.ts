const Q = require('../../../../../q.js');

describe("Q", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        const dispatchSpy = jest.spyOn(Q(obj), 'dispatch');
        return Q(obj).del("a").then(() => {
            expect(dispatchSpy).toHaveBeenCalledTimes(1);
            expect(dispatchSpy).toHaveBeenCalledWith('delete', ['a']);
        });
    });
});