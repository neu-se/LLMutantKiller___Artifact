import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect StopIteration exception correctly", () => {
        function* generator() {
            try {
                yield 1;
                throw new QReturnValue(1);
            } catch (e) {
                if (e instanceof QReturnValue) {
                    throw e;
                }
            }
        }
        const gen = generator();
        const result = gen.next();
        if (result.done) {
            throw new Error("Generator should not be done yet");
        }
        expect(() => gen.next()).toThrowError(QReturnValue);
    });
});