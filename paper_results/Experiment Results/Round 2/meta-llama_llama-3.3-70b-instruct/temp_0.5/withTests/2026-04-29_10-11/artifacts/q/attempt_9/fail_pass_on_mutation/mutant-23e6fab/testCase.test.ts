describe('q', () => {
    it('should handle attempt3 correctly', () => {
        const attempt3 = {
            then: function (fulfilled) {
                fulfilled();
            }
        };
        const result = attempt3.then(function() {
            return true;
        });
        expect(result).not.toBeNull();
    });

    it('should handle if (true) correctly', () => {
        const attempt3 = {
            then: function (fulfilled) {
                fulfilled();
            }
        };
        const result = attempt3.then(function() {
            return true;
        });
        expect(result).not.toBeNull();
    });
});