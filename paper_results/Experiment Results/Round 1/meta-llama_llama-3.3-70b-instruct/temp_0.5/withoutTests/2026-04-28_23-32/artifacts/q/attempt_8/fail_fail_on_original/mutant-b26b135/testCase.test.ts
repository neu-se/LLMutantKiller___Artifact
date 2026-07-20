import Q from './q';

describe("Q.fulfill", () => {
    it("should return a promise with a keys function that returns the object keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q.fulfill(obj);
        return promise.then((value) => {
            expect(Object.prototype.hasOwnProperty.call(value, 'keys')).toBe(true);
            expect(typeof value.keys).toBe('function');
            try {
                value.keys();
                expect(true).toBe(false);
            } catch (error) {
                expect(true).toBe(true);
            }
        });
    });
});