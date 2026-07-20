const Q = require('./q');

describe("Q.join", () => {
    it("should throw an error with a specific message when the values are not the same", () => {
        try {
            Q.join(Q(1), Q(2));
        } catch (e: any) {
            expect(e.message).toContain('Q can\'t join');
        }
    });
});