import { productList } from "./productList";
import { useState } from "react";

const App = () => {
	const [products, setProducts] = useState(productList);

	const addToCart = (which) => {
		setProducts((prevProducts) => {
			return products.map((product) => {
				if (product.id === which) {
					return { ...product, quantity: product.quantity + 1 };
				}
				return product;
			});
		});
	};

	const removeFromCart = (which) => {
		setProducts((prevProducts) => {
			return products.map((product) => {
				if (product.id === which) {
					return { ...product, quantity: Math.max(product.quantity - 1, 0) };
				}
				return product;
			});
		});
	};

	const renderProducts = (products) => {
		return (
			<div id="products-wrap">
				{products.map((product) => (
					<div className="visible-product">
						<img alt="Product" src={product.images[0]} />
						<div className="product-info">
							<h3>{product.description}</h3>
							<h2>{product.price}</h2>
						</div>
						<div className="cart-control">
							<h2>{product.quantity}</h2>
							<button
								className="cart-add"
								onClick={() => addToCart(product.id)}
							>
								+
							</button>
							<button
								className="cart-remove"
								onClick={() => removeFromCart(product.id)}
							>
								-
							</button>
						</div>
					</div>
				))}
			</div>
		);
	};
	return (
		<div id="main">
			<header>
				<input id="searchbar"></input>
				<button id="search"></button>
				<button id="checkout"></button>
			</header>
			<main>{renderProducts(products)}</main>
		</div>
	);
};

export default App;
