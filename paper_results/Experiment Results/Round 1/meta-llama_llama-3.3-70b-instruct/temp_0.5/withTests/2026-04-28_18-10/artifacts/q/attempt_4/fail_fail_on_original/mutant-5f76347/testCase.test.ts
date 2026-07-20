const Q = require('../../../../../q.js');

describe("Q", () => {
    it("should delete a property from an object", () => {
        const obj = { a: 1, b: 2 };
        const delSpy = jest.spyOn(Q(obj), 'dispatch');
        return Q(obj).del("a").then(() => {
            expect(delSpy).toHaveBeenCalledTimes(1);
            expect(delSpy).toHaveBeenCalledWith('delete', ['a']);
        });
    });
});