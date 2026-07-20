describe("Q", () => {
    it("should throw an error when trying to catch an empty catch block", () => {
        expect(() => {
            try {
                throw new Error();
            } catch (e) {}
        }).toThrowError();
    });
});