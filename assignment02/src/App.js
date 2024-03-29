import { useState } from "react";
import { products } from "./products";

const renderProducts = (visibleProducts) => {
	return (
		<div id="products-wrap">
			{visibleProducts.map((product) => (
				<div className="visible-product">
					<img alt="Product" src={product.images[0]} />
					<div className="product-info">
						<h3>{product.description}</h3>
                        <h2>{product.price}</h2>
					</div>
                    <div className="cart-control">
                        <h2>X</h2> {/* TODO update w/ state*/}
                        <button className="cart-add"></button>
                        <button className="cart-remove"></button>

                    </div>
				</div>
			))}
		</div>
	);
};

const App = () => {
	const [visibleProducts, setVisibleProducts] = useState(products);

	return (
		<div id="main">
			<header>
				<input id="searchbar"></input>
				<button id="search"></button>
				<button id="checkout"></button>
			</header>
			<main>{renderProducts(visibleProducts)}</main>
		</div>
	);
};

export default App;
