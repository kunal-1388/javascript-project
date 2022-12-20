describe("Checking for proper listing of products", () => {
    it("Checking for proper listing of products", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".productscontainer").within(() => {
            cy.get(".product").each(($el, index, $list) => {
                cy.wrap($el).within(() => {
                    cy.get(".pimage");
                    cy.get(".ptitle");
                    cy.get(".priceandaddtocart");
                });
            });
        });
    });
});
