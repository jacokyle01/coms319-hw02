import { useState } from "react";
import { products } from "./products";

const renderProducts = (visibleProducts) => {
	return (
		<div>
			{visibleProducts.map((product) => (
				<div>
					<img
						alt="Product"
						src={product.images[0]}
						className="w-full h-full object-center object-cover lg:w-full lg:h-full"
					/>
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
			<main>
				<div id="products-wrap" className="ml-5 p-10 xl:basis-4/5">
					{renderProducts(visibleProducts)}
				</div>
			</main>
		</div>
	);
};

export default App;
