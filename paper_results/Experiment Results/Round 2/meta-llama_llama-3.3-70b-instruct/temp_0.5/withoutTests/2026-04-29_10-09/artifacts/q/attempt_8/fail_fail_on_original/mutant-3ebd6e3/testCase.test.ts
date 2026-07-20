describe("Q.allSettled", () => {
    it("should return an array of settled promises with state and value/reason", async () => {
        const promises = [Q.resolve(1), Q.resolve(2), Q.reject("error")];
        const result = await Q.allSettled(promises);
        expect(result.length).toBe(3);
        expect(result[0]).toHaveProperty('state');
        expect(result[0]).toHaveProperty('value');
        expect(result[1]).toHaveProperty('state');
        expect(result[1]).toHaveProperty('value');
        expect(result[2]).toHaveProperty('state');
        expect(result[2]).toHaveProperty('reason');
    });
});