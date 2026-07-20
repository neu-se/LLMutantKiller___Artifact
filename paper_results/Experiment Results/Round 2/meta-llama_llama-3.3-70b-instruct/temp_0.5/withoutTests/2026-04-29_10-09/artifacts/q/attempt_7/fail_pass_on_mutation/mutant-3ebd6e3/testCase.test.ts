describe("Q.allSettled", () => {
    it("should return an array of settled promises", async () => {
        const promises = [Promise.resolve(1), Promise.resolve(2), Promise.reject("error")];
        const result = await Promise.allSettled(promises);
        expect(result.length).toBe(3);
        expect(result[0].status).toBe("fulfilled");
        expect(result[0].value).toBe(1);
        expect(result[1].status).toBe("fulfilled");
        expect(result[1].value).toBe(2);
        expect(result[2].status).toBe("rejected");
        expect(result[2].reason).toBe("error");
    });
});