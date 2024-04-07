import { productList } from "./productJson";
import { useState } from "react";
import { useForm } from "react-hook-form";

const App = () => {
	const [products, setProducts] = useState(productList);
	const [query, setQuery] = useState("");
	const [view, setView] = useState("browse"); //browse, cart, or confirm
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			fullName: "Joad Cressbeckler",
			email: "cressbecklerstance@gmail.com",
			creditCard: "4111111111111111",
			address: "25802 Beckley Lane",
			address2: "35202 Hornswaggle Avenue",
			city: "Beckley",
			state: "West Virginia",
			zip: "24701"
		},
	});
	const [dataF, setDataF] = useState({});

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
						<img className="product-img" alt="Product" src={product.images[0]} />
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
		  setView("confirm");
		};
	  
		return (
		  <div>
			<form
			  onSubmit={handleSubmit(onSubmit)}
			  style={{ width: "800px", margin: "0 auto" }}
			>
			  <div style={{ marginBottom: "20px" }}>
				<div style={{ display: "flex", marginBottom: "10px" }}>
				  <div style={{ marginRight: "20px", flex: 1 }}>
					<p>Full Name</p>
					<input
					  {...register("fullName", { required: true })}
					  placeholder="Full Name"
					  style={{ width: "100%", height: "40px", fontSize: 20 }}
					/>
					{errors.fullName && <p>Full Name is required.</p>}
				  </div>
				  <div style={{ flex: 1 }}>
					<p>Email</p>
					<input
					  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
					  placeholder="Email"
					  style={{ width: "100%", height: "40px", fontSize: 20 }}
					/>
					{errors.email && <p>Email is required.</p>}
				  </div>
				</div>
				<p>Credit Card</p>
				<input
				  {...register("creditCard", {
					required: true,
					pattern: /^[0-9]{16}$/,
				  })}
				  placeholder="Credit Card"
				  style={{ width: "100%", height: "40px", fontSize: 20 }}
				/>
				{errors.creditCard && <p>Please enter a valid credit card number.</p>}
			  </div>
			  <div style={{ display: "flex", marginBottom: "20px" }}>
				<div style={{ marginRight: "20px", flex: 1 }}>
				  <p>Address</p>
				  <input
					{...register("address", { required: true })}
					placeholder="Address"
					style={{ width: "100%", height: "40px", fontSize: 20 }}
				  />
				  {errors.address && <p>Address is required.</p>}
				</div>
				<div style={{ flex: 1 }}>
				  <p>Address 2</p>
				  <input
					{...register("address2")}
					placeholder="Address 2"
					style={{ width: "100%", height: "40px", fontSize: 20 }}
				  />
				</div>
			  </div>
			  <div style={{ display: "flex", marginBottom: "20px" }}>
				<div style={{ marginRight: "20px", flex: 1 }}>
				  <p>City</p>
				  <input
					{...register("city", { required: true })}
					placeholder="City"
					style={{ width: "100%", height: "40px", fontSize: 20 }}
				  />
				  {errors.city && <p>City is required.</p>}
				</div>
				<div style={{ marginRight: "20px", flex: 1 }}>
				  <p>State</p>
				  <input
					{...register("state", { required: true })}
					placeholder="State"
					style={{ width: "100%", height: "40px", fontSize: 20 }}
				  />
				  {errors.state && <p>State is required.</p>}
				</div>
				<div style={{ flex: 1 }}>
				  <p>Zip</p>
				  <input
					{...register("zip", { required: true, pattern: /^[0-9]{5}$/ })}
					placeholder="Zip"
					style={{ width: "100%", height: "40px", fontSize: 20 }}
				  />
				  {errors.zip && <p>Please enter a valid zip code.</p>}
				</div>
			  </div>
			  <button
				type="submit"
				style={{
				  width: "100px",
				  height: "50px",
				  fontSize: 20,
				  background: "blue",
				  color: "white",
				}}
			  >
				Order
			  </button>
			</form>
		  </div>
		);
	  }

	const purchasedProducts = () => {
		return products.filter((product) => product.quantity > 0);
	};

	const renderCart = () => {
		const cart = purchasedProducts();
		const totalPrice = cart.reduce((total, product) => {
			return total + product.quantity * product.price;
		}, 0);
		const totalItems = cart.reduce((total, product) => {
			return total + product.quantity;
		}, 0);

		return (
			<>
				<div id="cart-wrap">
					<div style={{flex: 1}}>
					{cart.map((product) => (
						<div key={product.id} className="cart-product">
							<div id="cart-image">
								<img className="cart-pic" alt="Product" src={product.images[0]} />
							</div>
							<div style={{ flex: "1", marginLeft:"20px", textAlign:"center"}}>
								<h2>{product.title}</h2>
								<p>Quantity: {product.quantity}</p>
							</div>
								<td style={{ float: "right"}}>
									<h1 style={{ color: 'green', fontWeight: 'bold' }}>${product.price * product.quantity}</h1>
								</td>
						</div>
					))}
					{/* <div id="cart-price">
						<h2>Total Price: ${totalPrice}</h2>
						{Payment()}
					</div> */}
				</div>
				<div id="payment-wrap">
					<h1>Subtotal ({totalItems} items): <span style={{ color: "green" }}>${totalPrice}</span></h1>
					{Payment()}
					</div>
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
					<div style={{ display: "flex", justifyContent: "space-between", marginLeft:"250px", marginRight:"250px" }}>
						<div>
							<h1>Items in cart</h1>
						</div>
						<div>
							<h1>Payment Information</h1>
						</div>
					</div>
					{renderCart()}
				</main>
				{/* <main>
					<div style={{display:"flex"}}>
						<h1>Items in cart</h1>
						<h1 style={{float:"right"}}>Payment Information</h1>
					</div>
					{renderCart()}
				</main> */}
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
						style={{width:"600px", height:"30px", fontSize:"20", alignSelf:"center", fontSize:'20px'}}
						value={query}
						onChange={updateQuery}
					></input>
					<button style={{float: "right", width: "100px", height: "40px", fontSize: 20,background: "blue",color: "white",}} id="checkout" onClick={() => setView("cart")}>
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
		const cart = purchasedProducts();
		const totalPrice = cart.reduce((total, product) => {
			return total + product.quantity * product.price;
		}, 0);
		return (
			<>
				<div id="receipt">
					<div className="personal-info">
						{console.log(dataF)}
						<h1>{dataF.fullName}</h1>
					</div>
					<table>
						<thead>
							<tr>
								<th style={{ width: "60%" }}>Title</th>
								<th style={{ width: "20%" }}>Quantity</th>
								<th style={{ width: "20%" }}>Price</th>
							</tr>
						</thead>
						<tbody>
							{purchasedProducts().map((product, index) => (
								<tr key={index} className="receipt-line">
									<td>{product.title}</td>
									<td>{product.quantity}</td>
									<td>${product.price}</td>
								</tr>
							))}
						</tbody>
					</table>
					<p>Price Total: ${totalPrice}</p>
					{/* {console.log(cart)} */}
				</div>
				<button id="fresh" onClick={() => handleFreshBrowse()}>
					Back to shopping
				</button>
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
