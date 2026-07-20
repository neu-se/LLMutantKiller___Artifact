describe("Q", () => {
    it("should throw an error when nextTick.runAfter is called with a condition that is always false", () => {
        const originalRunAfter = Q.nextTick.runAfter;
        Q.nextTick.runAfter = () => { 
            if (false) {
                Q.nextTick.flushing = true;
                Q.nextTick.requestTick();
            }
        };
        expect(() => Q.nextTick.runAfter(() => {})).toThrowError();
        Q.nextTick.runAfter = originalRunAfter;
    });
});