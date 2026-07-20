describe("Promise", () => {
    it("should behave differently for inspected.state !== 'rejected'", () => {
        const promise = Q(10);
        const inspected = promise.inspect();
        expect(inspected.state).toBe("fulfilled");
        const valueOf = promise.valueOf();
        expect(valueOf).toBe(10);

        const rejectedPromise = Q.reject(new Error("Test"));
        const rejectedInspected = rejectedPromise.inspect();
        expect(rejectedInspected.state).toBe("rejected");
        const rejectedValueOf = rejectedPromise.valueOf();
        expect(rejectedValueOf).toBe(rejectedPromise);

        const pendingPromise = Q.defer().promise;
        const pendingInspected = pendingPromise.inspect();
        expect(pendingInspected.state).toBe("pending");
        const pendingValueOf = pendingPromise.valueOf();
        expect(pendingValueOf).toBe(pendingPromise);
    });
});