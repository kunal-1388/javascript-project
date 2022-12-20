// 1
describe("Checking for proper listing of products", () => {
    it("Checking for proper listing of products", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".productscontainer").within(() => {
            cy.get(".product")
                .each(($el, index, $list) => {
                    cy.wrap($el).within(() => {
                        cy.get(".pimage");
                        cy.get(".ptitle");
                        cy.get(".priceandaddtocart");
                    });
                })
                .then(($lis) => {
                    expect($lis).to.have.length(20); // true
                });
        });
    });
});

//2

describe("Checking for Cart open and close functionality", () => {
    it("Checking for Cart open and close functionality", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".carticon").click();
        cy.get(".cartui.cartopened");
        cy.get(".closecart").click();
        cy.get(".cartui.cartopened").should("not.exist");
    });
});

// 3

describe("Checking for Product Class", () => {
    it("Checking for Product Class", () => {
        cy.visit("http://localhost:5500/");
        cy.window().then((win) => {
            const obj = new win.Product(1, "demo", 100, "link");
        });
    });
});

describe("Checking for local storage to store the cart items", () => {
    it("Checking for local storage to store the cart items", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").each(($el) => {
            cy.wrap($el).click();
        });
        cy.log(JSON.parse(window.localStorage.getItem("products"))).should(
            "have.length",
            20
        );
    });
});
