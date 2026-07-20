describe('Q.delay', function () {
    it('should delay fulfillment', function () {
        var promise = Q.delay(50);
        return promise.then(function () {
            expect(true).toBe(true);
        });
    });

    it('should reject immediately if the input promise is rejected', function () {
        var promise = Q.reject(new Error("haha!")).delay(50);
        return promise.then(function () {
            expect(true).toBe(false);
        }, function (error) {
            expect(error.message).toBe("haha!");
        });
    });
});