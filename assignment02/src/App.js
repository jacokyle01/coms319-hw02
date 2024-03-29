import { useState } from "react";
import { products } from "./products";


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
				<div id="products-wrap"></div>
			</main>
		</div>
	);
};

export default App;
