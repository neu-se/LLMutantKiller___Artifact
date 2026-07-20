const Q = require('./q');

describe("Q.join", () => {
    it("should throw an error when the values are not the same", () => {
        expect(() => Q.join(Q(1), Q(2))).toThrow();
    });

    it("should throw an error with a specific message when the values are not the same in the original code", () => {
        try {
            Q.join(Q(1), Q(2));
        } catch (e) {
            expect(e.message).toMatch(/Q can't join/);
        }
    });

    it("should throw an error with a different message when the values are not the same in the mutated code", () => {
        try {
            Q.join(Q(1), Q(2));
        } catch (e) {
            expect(e.message).not.toMatch(/Q can't join/);
        }
    });
});