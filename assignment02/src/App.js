import { productList } from "./productList";
import { useState } from "react";
import { useForm } from "react-hook-form";

const App = () => {
	const [cart, setCart] = useState([]);
	const [products, setProducts] = useState(productList);
	const [query, setQuery] = useState("");
	const [view, setView] = useState("browse"); //browse, cart, or confirm
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [dataF, setDataF] = useState({});
	const [viewer, setViewer] = useState(0);

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

	function Payment() {
		const onSubmit = (data) => {
			console.log({ data });
			setDataF(data);
		};
		return (
			<div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					style={{ width: "800px", margin: "0 auto" }}
				>
					<input
						{...register("fullName", { required: true })}
						placeholder="Full Name"
						style={{ width: "792px", height: "50px", fontSize: 20 }}
					/>
					{errors.fullName && <p>Full Name is required.</p>}
					<input
						{...register("email", { required: true, pattern: /^\S+@\S+$/i })}
						placeholder="Email"
						style={{ width: "792px", height: "50px", fontSize: 20 }}
					/>
					{errors.email && <p>Email is required.</p>}
					<input
						{...register("creditCard", {
							required: true,
							pattern: /^[0-9]{16}$/,
						})}
						placeholder="Credit Card"
						style={{ width: "792px", height: "50px", fontSize: 20 }}
					/>
					{errors.creditCard && <p>Please enter a valid credit card number.</p>}
					<input
						{...register("address", { required: true })}
						placeholder="Address"
						style={{ width: "792px", height: "50px", fontSize: 20 }}
					/>
					{errors.address && <p>Address is required.</p>}
					<input
						{...register("address2")}
						placeholder="Address 2"
						style={{ width: "792px", height: "50px", fontSize: 20 }}
					/>
					<input
						{...register("city", { required: true })}
						placeholder="City"
						style={{ width: "792px", height: "50px", fontSize: 20 }}
					/>
					{errors.city && <p>City is required.</p>}
					<input
						{...register("state", { required: true })}
						placeholder="State"
						style={{ width: "792px", height: "50px", fontSize: 20 }}
					/>
					{errors.state && <p>State is required.</p>}
					<input
						{...register("zip", { required: true, pattern: /^[0-9]{5}$/ })}
						placeholder="Zip"
						style={{ width: "792px", height: "50px", fontSize: 20 }}
					/>
					{errors.zip && <p>Please enter a valid zip code.</p>}
					<button
						type="submit"
						style={{
							width: "100px",
							height: "50px",
							fontSize: 20,
							background: "blue",
							color: "white",
						}}
						onClick={() => setView("confirm")}
					>
						Order
					</button>
				</form>
			</div>
		);
	}

	const renderCart = () => {
		const cart = products.filter((product) => product.quantity > 0);
		const totalPrice = cart.reduce((total, product) => {
			return total + product.quantity * product.price;
		}, 0);

		return (
			<>
				<div id="cart-wrap">
					{cart.map((product) => (
						<div key={product.id} className="cart-product">
							<div id="cart-image">
								<img alt="Product" src={product.images[0]} />
							</div>
							<div style={{ flex: "1" }}>
								<h2>{product.title}</h2>
								<p>Quantity: {product.quantity}</p>
								<td style={{ textAlign: "right" }}>
									Price: ${product.price * product.quantity}
								</td>
							</div>
						</div>
					))}
					{/* <div id="cart-price">
						<h2>Total Price: ${totalPrice}</h2>
						{Payment()}
					</div> */}
				</div>
				<div id="payment-wrap">
					<h2>Total Price: ${totalPrice}</h2>
					<h1>Payment Information</h1>
					{Payment()}
				</div>
			</>
		);
	};

	const cartView = () => {
		return (
			<div id="main">
				<header>
					<button id="browse" onClick={() => setView("browse")}>
						Return
					</button>
				</header>
				<main>
					<h1>Items in cart</h1>
					{renderCart()}
				</main>
			</div>
		);
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
					<button id="checkout" onClick={() => setView("cart")}>
						{" "}
						Checkout
					</button>
				</header>
				<main>{renderFilteredProducts()}</main>
			</div>
		);
	};

	const clearCart = () => {
		setProducts((prevProducts) => {
			return products.map((product) => {
				return { ...product, quantity: 0 };
			});
		});
	};

	const handleFreshBrowse = () => {
		clearCart();
		setView("browse");
	};

	const confirmView = () => {
		return (
			<>
				<div id="receipt">

					{products.map((products) => (
						<div>hi</div>
					))}
					{/* {console.log(cart)} */}
				</div>
				<button id="fresh" onClick={() => handleFreshBrowse()}></button>
			</>
		);
	};

	//DOM Tree = f(view)
	//display a different DOM tree depending on browsing, checking out, etc...
	const renderView = () => {
		switch (view) {
			case "browse":
				return browseView();
			case "cart":
				return cartView();
			case "confirm":
				return confirmView();
			default:
				return;
		}
	};

	return <div id="main">{renderView()}</div>;
};

export default App;
