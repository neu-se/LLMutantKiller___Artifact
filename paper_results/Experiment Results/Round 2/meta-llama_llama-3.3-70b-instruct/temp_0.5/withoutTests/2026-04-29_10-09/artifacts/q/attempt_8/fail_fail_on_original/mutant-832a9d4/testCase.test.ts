import Q from "./q.js";

describe("Q", () => {
    it("should handle nextTick correctly", (done) => {
        let called = false;
        Q.nextTick(() => {
            called = true;
        });
        setTimeout(() => {
            expect(called).toBe(true);
            done();
        }, 10);
    });

    it("should throw an error when nextTick is called with an invalid argument", () => {
        expect(() => {
            Q.nextTick("invalid argument");
        }).toThrowError();
    });
});