describe("Promise.join", () => {
    it("should return a promise that fulfills with the first value if they are the same", () => {
        const Q = require("../q");
        return Q.join(Q(1), Q(1)).then((value: number) => {
            expect(value).toBe(1);
        });
    });
});