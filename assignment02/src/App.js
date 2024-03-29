import { productList } from "./productList";
import { useState } from "react";

const App = () => {
	const [products, setProducts] = useState(productList);
	const [query, setQuery] = useState("");
	const [view, setView] = useState("browse"); //browse, cart, or confirm

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

	const renderProducts = (filteredProducts) => {
		return (
			<div id="products-wrap">
				{filteredProducts.map((product) => (
					<div className="visible-product">
						<h1>{product.title}</h1>
						<img alt="Product" src={product.images[0]} />
						<div className="product-info">
							<p>{product.description}</p>
							<h2>${product.price}</h2>
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

	const updateQuery = (e) => {
		setQuery(e.target.value);
	};

	const renderFilteredProducts = () => {
		const filteredProducts = products.filter((product) =>
			product.title.toLowerCase().includes(query.toLowerCase())
		);
		return renderProducts(filteredProducts);
	};

	const browseView = () => {
		return (
			<div id="main">
				<header>
					<input
						id="searchbar"
						placeholder="Type to search"
						value={query}
						onChange={updateQuery}
					></input>
					<button id="search">Search</button>
					<button id="checkout"> Checkout</button>
				</header>
				<main>{renderFilteredProducts()}</main>
			</div>
		);
	};

	//DOM Tree = f(view)
	//display a different DOM tree depending on browsing, checking out, etc...
	const renderView = () => {
		switch (view) {
			case "browse":
				return browseView();
			case "cart":
			case "confirm":
			default:
				return;
		}
	};

	return <div id="main">{renderView()}</div>;
};

export default App;
