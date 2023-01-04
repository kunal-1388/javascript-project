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
        cy.window().then((win) => {
            let products = [
                {
                    id: "3",
                    image: " https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg ",
                    price: "55.99 DH",
                    title: "Mens Cotton Jacket",
                },
            ];
            win.localStorage.setItem("products", JSON.stringify(products));
            let item = win.Storage.getproducts();
            cy.wrap(item).should("have.length", 1);

            let product = {
                id: "4",
                image: " https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg ",
                price: "15.99 DH",
                title: "Mens Casual Slim Fit",
            };

            win.Storage.addtolocalstorage(product);
            let item1 = win.Storage.getproducts();
            cy.wrap(item1).should("have.length", 2);
        });
    });
});

describe("Checking for local storage to remove the deleted cart items", () => {
    it("Checking for local storage to remove the deleted cart items", () => {
        cy.visit("http://localhost:5500/");
        cy.window().then((win) => {
            win.Storage.removeproduct(3);
            let item = win.Storage.getproducts();
            cy.wrap(item).should("have.length", 0);
        });
    });
});

// 5

describe("Cheking for the product to be added to the Cart", () => {
    it("Cheking for the product to be added to the Cart", () => {
        cy.visit("http://localhost:5500/");

        let product = {
            id: "4",
            image: " https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg ",
            price: "15.99 DH",
            title: "Mens Casual Slim Fit",
        };

        cy.window().then((win) => {
            win.Ui.displayproducts(product);
        });
        cy.get(".carticon")
            .click()
            .then(() => {
                cy.get(".cartproduct").should("have.length", 1);
            });
    });
});

describe("Cheking for the products in local storage to be displayed in the cart items", () => {
    it("Cheking for the products in local storage to be displayed in the cart items", () => {
        cy.visit("http://localhost:5500/");
        cy.window().then((win) => {
            let products = [
                {
                    id: "3",
                    image: " https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg ",
                    price: "55.99 DH",
                    title: "Mens Cotton Jacket",
                },
                {
                    id: "4",
                    image: " https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg ",
                    price: "15.99 DH",
                    title: "Mens Casual Slim Fit",
                },
            ];
            win.localStorage.setItem("products", JSON.stringify(products));
            win.Ui.displayproductsLS();
        });
        cy.get(".carticon")
            .click()
            .then(() => {
                cy.get(".cartproduct").should("have.length", 2);
            });
    });
});



// // 6

describe("checking for cart items to be displayed when the page is refreshed", () => {
    it("checking for cart items to be displayed when the page is refreshed", () => {
        cy.visit("http://localhost:5500/");
        cy.window().then((win) => {
            let products = [
                {
                    id: "3",
                    image: " https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg ",
                    price: "55.99 DH",
                    title: "Mens Cotton Jacket",
                },
                {
                    id: "4",
                    image: " https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg ",
                    price: "15.99 DH",
                    title: "Mens Casual Slim Fit",
                },
            ];
            win.localStorage.setItem("products", JSON.stringify(products));
            win.Ui.displayproductsLS();
            win.bag.setAttribute("items", win.Storage.getproducts().length);
        });
        cy.get(".carticon")
            .click()
            .then(() => {
                cy.get(".cartproduct").should("have.length", 2);
                cy.get(".carticon")
                    .invoke("attr", "items")
                    .should("equal", "2");
            });
    });
});

// // //7

describe("Checking whether the item added to cart is displayed in cart or not", () => {
    it("Checking whether the item added to cart is displayed in cart or not", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").first().click();
        cy.reload();
        cy.get(".carticon")
            .click()
            .then(() => {
                cy.get(".cartproduct").should("have.length", 1);
            });
    });
});

// // // 8

describe("Checking whether the deleted items are removed from the cart and local storage or not", () => {
    it("Checking whether the deleted items are removed from the cart and local storage or not", () => {
        cy.visit("http://localhost:5500/");
        cy.get(".addtocart").each(($el) => {
            cy.wrap($el).click();
        });
        cy.get(".carticon")
            .click()
            .then(() => {
                cy.get(".cartproduct").should("have.length", 20);
                cy.window().then((win) => {
                    const item = JSON.parse(
                        win.localStorage.getItem("products")
                    );
                    cy.wrap(item).should("have.length", 20);
                });

                cy.get(".delete").each(($el) => {
                    cy.wrap($el).click();
                });
                cy.get(".cartproduct").should("have.length", 0);
                cy.window().then((win) => {
                    const item = JSON.parse(
                        win.localStorage.getItem("products")
                    );
                    cy.wrap(item).should("have.length", 0);
                });
            });
    });
});
