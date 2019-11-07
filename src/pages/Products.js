import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../App.css";
import "../styles/Product.css";
import { products } from "../data/products";

const Products = props => {
  const [state, setState] = useState({ product: "" });

  useEffect(() => {
    const { steps } = props;
    const { product } = steps;
    setState({ product });
  }, [props]);

  const { product } = state;

  console.log(products, product.value);

  return (
    <div className="product">
      {products &&
        product &&
        products[product.value].map((item, i) => (
          <table>
            <tbody>
              <tr>
                <td>
                  <b>Product name:</b>
                </td>
                <td>
                  <b>{`${item.name}`}</b>
                </td>
              </tr>
              <tr>
                <td>Model</td>
                <td>{`${item.model}`}</td>
              </tr>
              <tr>
                <td>Product image</td>
                <td>
                  <img
                    src={item.img_link}
                    width="300"
                    height="300"
                    alt={item.name}
                  />
                </td>
              </tr>
              <tr>
                <td>Function</td>
                <td>{`${item.function}`}</td>
              </tr>
              <tr>
                <td>Speciality</td>
                <td>{`${item.speciality}`}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{`${item.description}`}</td>
              </tr>
              <tr>
                <td>Characteristics</td>
                <td>
                  <ul>
                    {item.characteristics.map((c, i) => (
                      <li>{`${c}`}</li>
                    ))}
                  </ul>
                </td>
              </tr>
              <tr>
                <td>Amount</td>
                <td>{`₹ ${item.price}`}</td>
              </tr>
              <tr>
                <button
                  className="buy-product"
                  type="button"
                  value="Buy product"
                  onClick={() => {
                    window.open(item.url, "_blank");
                  }}
                >
                  Buy product
                </button>
              </tr>
            </tbody>
            <br />
          </table>
        ))}
    </div>
  );
};

Products.propTypes = {
  steps: PropTypes.object
};

Products.defaultProps = {
  steps: undefined
};

// class Products extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       product: ""
//     };
//   }

//   componentDidMount() {
//     // console.log(this.state.product);
//     const [state, setState] = useState({ product: "" });
//     useEffect(() => {
//       const { steps } = this.props;
//       const { product } = steps;
//       setState({ product });
//     }, [this.props]);
//   }

//   render() {
//     return (
//       <div className="product">
//         <h3>Trimmer</h3>
//         <table>
//           <tbody>
//             <tr>
//               <td>BEARD TRIMMER CLOSED BOX</td>
//             </tr>
//             <tr>
//               <td>QT4000/15</td>
//             </tr>
//             <tr>
//               <td>
//                 <img
//                   src="https://images.philips.com/is/image/PhilipsConsumer/QT4000_15-A1P-global-001"
//                   width="50%"
//                   alt="trimmer"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>Perfect beard made easy</td>
//             </tr>
//             <tr>
//               <td>The most convenient way to start with your beard</td>
//             </tr>
//             <tr>
//               <td>
//                 Style your beard the way you want with this beard trimmer.
//                 Precision from as short as 1mm up to 10mm.
//               </td>
//             </tr>
//             <tr>
//               <td>
//                 <ul>
//                   <li>1mm precision settings</li>
//                   <li>Stainless steel blades</li>
//                   <li>10h charge/45mins cordless use</li>
//                 </ul>
//               </td>
//             </tr>
//             <tr>
//               <td>Rs. 1,256</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

// Products.propTypes = {
//   steps: PropTypes.object
// };

// Products.defaultProps = {
//   steps: undefined
// };

export default Products;
