describe('Q.delay', function () {
    it('should delay fulfillment', function () {
        var promise = Q.delay(50);
        return promise.then(function () {
            expect(true).toBe(true);
        });
    });

    it('should not delay rejection', function () {
        var promise = Q.delay(Q.reject(new Error("haha!")), 50);
        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("haha!");
        });
    });
});