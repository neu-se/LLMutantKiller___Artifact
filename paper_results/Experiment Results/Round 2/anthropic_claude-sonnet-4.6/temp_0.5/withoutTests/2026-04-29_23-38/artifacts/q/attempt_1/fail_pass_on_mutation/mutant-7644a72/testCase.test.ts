import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.return", () => {
    it("should throw a QReturnValue with the given value", () => {
        let thrown;
        try {
            Q["return"](42);
        } catch (e) {
            thrown = e;
        }
        expect(thrown).toBeDefined();
        expect(thrown.value).toBe(42);
    });
});