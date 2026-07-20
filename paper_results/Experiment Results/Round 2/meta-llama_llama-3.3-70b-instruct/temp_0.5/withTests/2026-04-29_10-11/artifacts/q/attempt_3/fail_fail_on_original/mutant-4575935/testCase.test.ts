describe("Q behavior in a browser environment", () => {
    it("should create a global Q object when executed as a script", () => {
        // Load the Q library
        const script = document.createElement('script');
        script.src = './q.js';
        document.head.appendChild(script);

        // Wait for the script to load
        return new Promise(resolve => {
            script.onload = () => {
                // Since the mutation changes the behavior of Q in a browser environment,
                // we can test this by checking if the Q object is created as a global variable.
                expect(typeof window.Q).toBe("function");
                resolve();
            };
        });
    });
});