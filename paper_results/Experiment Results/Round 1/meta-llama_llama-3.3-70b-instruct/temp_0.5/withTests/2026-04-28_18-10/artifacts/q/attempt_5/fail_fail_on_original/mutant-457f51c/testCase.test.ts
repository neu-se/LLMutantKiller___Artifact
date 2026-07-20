describe("mutation test", () => {
    it("should detect the mutation", () => {
        const promise = Q.reject(new Error());
        const inspected = promise.inspect();
        if (inspected.state === "rejected") {
            expect(inspected.reason).toBeInstanceOf(Error);
        } else {
            expect(inspected.state).toBe("pending");
        }
    });
});