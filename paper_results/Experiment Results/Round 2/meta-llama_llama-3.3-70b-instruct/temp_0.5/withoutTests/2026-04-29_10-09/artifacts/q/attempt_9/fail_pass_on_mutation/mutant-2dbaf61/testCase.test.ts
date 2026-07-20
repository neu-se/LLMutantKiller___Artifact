describe("Q", () => {
    it("should correctly handle a try-catch block with an error", () => {
        let errorCaught = false;
        try {
            throw new Error();
        } catch (e) {
            errorCaught = true;
        }
        expect(errorCaught).toBe(true);
        try {
            try {} catch (e) {}
        } catch (e) {
            expect(e).toBeUndefined();
        }
    });
});