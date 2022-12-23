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

//4
describe("Checking for local storage to store the cart items", () => {
    it("Checking for local storage to store the cart items", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").each(($el) => {
            cy.wrap($el).click();
        });

        cy.window().then((win) => {
            const item = JSON.parse(win.localStorage.getItem("products"));
            cy.wrap(item).should("have.length", 20);
        });
    });
});

describe("Checking for local storage to remove the deleted cart items", () => {
    it("Checking for local storage to remove the deleted cart items", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").each(($el) => {
            cy.wrap($el).click();
        });

        cy.window().then((win) => {
            const item = JSON.parse(win.localStorage.getItem("products"));
            cy.wrap(item).should("have.length", 20);
        });

        cy.visit("http://localhost:5500/");
        cy.get(".carticon").click();
        cy.get(".delete").each(($el) => {
            cy.wrap($el).click();
        });

        cy.window().then((win) => {
            const item = JSON.parse(win.localStorage.getItem("products"));
            cy.wrap(item).should("have.length", 0);
        });
    });
});

// 5

describe("Cheking for the product to be added to the Local Storage when add to cart buttton is clicked", () => {
    it("Cheking for the product to be added to the Local Storage when add to cart buttton is clicked", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").each(($el) => {
            cy.wrap($el).click();
        });

        cy.window().then((win) => {
            const item = JSON.parse(win.localStorage.getItem("products"));
            cy.wrap(item).should("have.length", 20);
        });

        cy.get(".cartproduct").should("have.length", 20);
    });
});

describe("Cheking for the products in local storage to be displayed in the cart items", () => {
    it("Cheking for the products in local storage to be displayed in the cart items", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").each(($el) => {
            cy.wrap($el).click();
        });
        cy.reload();
        cy.get(".cartproduct").should("have.length", 20);
    });
});

describe("checking for remove product functionality", () => {
    it("checking for remove product functionality", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").each(($el) => {
            cy.wrap($el).click();
        });
        cy.get(".carticon").click();
        cy.get(".cartproduct").should("have.length", 20);
        cy.get(".delete").each(($el) => {
            cy.wrap($el).click();
        });
        cy.get(".cartproduct").should("have.length", 0);
    });
});

// 6

describe("checking for cart items to be displayed when the page is refreshed", () => {
    it("checking for cart items to be displayed when the page is refreshed", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").each(($el) => {
            cy.wrap($el).click();
        });
        cy.reload();
        cy.get(".cartproduct").should("have.length", 20);
        cy.get(".carticon").invoke("attr", "items").should("equal", "20");
    });
});

7

describe("Checking whether the item added to cart is displayed in cart or not", () => {
    it("Checking whether the item added to cart is displayed in cart or not", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").each(($el) => {
            cy.wrap($el).click();
        });
        cy.reload();
        cy.get(".cartproduct").should("have.length", 20);
    });
});

8

describe("Checking whether the deleted items are removed from the cart and local storage or not", () => {
    it("Checking whether the deleted items are removed from the cart and local storage or not", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").each(($el) => {
            cy.wrap($el).click();
        });
        cy.reload();
        cy.get(".cartproduct").should("have.length", 20);
        cy.window().then((win) => {
            const item = JSON.parse(win.localStorage.getItem("products"));
            cy.wrap(item).should("have.length", 20);
        });

        cy.get(".cartproduct").should("have.length", 20);
        cy.get(".carticon").click();
        cy.get(".delete").each(($el) => {
            cy.wrap($el).click();
        });
        cy.get(".cartproduct").should("have.length", 0);
        cy.window().then((win) => {
            const item = JSON.parse(win.localStorage.getItem("products"));
            cy.wrap(item).should("have.length", 0);
        });

    });
});
