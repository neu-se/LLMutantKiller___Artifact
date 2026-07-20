import Q from './q';

describe("Q.fulfill", () => {
    it("should return a promise with a keys function that returns the object keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        const promise = Q.fulfill(obj);
        return promise.then((value) => {
            expect(Object.keys(value)).toEqual(["a", "b", "c"]);
        });
    });
});