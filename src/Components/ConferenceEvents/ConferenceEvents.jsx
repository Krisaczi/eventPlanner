import styles from "./ConferenceEvents.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../venueSlice";
import { useState } from "react";
import { decrementAvQuantity, incrementAvQuantity } from "../avSlice";
import { toggleMealSelection } from "../mealSlice";

const ConferenceEvents = () => {
  const [showItems, setShowItems] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const venueItems = useSelector((state) => state.venue);
  const avItems = useSelector((state) => state.av);
  const mealsItems = useSelector((state) => state.meals);
  const dispatch = useDispatch();
  const remainingAuditoriumQuantity =
    3 -
    venueItems.find((item) => item.name === "Auditorium Hall (Capacity:200)")
      .quantity;

  const handleAddToCart = (index) => {
    if (
      venueItems[index].name === "Auditorium Hall (Capacity:200)" &&
      venueItems[index].quantity >= 3
    ) {
      return;
    }
    dispatch(incrementQuantity(index));
  };

  const handleRemoveFromCart = (index) => {
    if (venueItems[index].quantity > 0) {
      dispatch(decrementQuantity(index));
    }
  };

  const handleIncrementAvQuantity = (index) => {
    dispatch(incrementAvQuantity(index));
  };

  const handleDecrementAvQuantity = (index) => {
    dispatch(decrementAvQuantity(index));
  };

  const handleMealSelection = (index) => {
    const item = mealsItems[index];
    if (item.selected && item.type === "mealForPeople") {
      const newNumberOfPeople = item.selected ? numberOfPeople : 0;
      dispatch(toggleMealSelection(index, numberOfPeople));
    } else {
      dispatch(toggleMealSelection(index));
    }
  };
  const calculateTotalCost = (section) => {
    let totalCost = 0;
    if (section === "venue") {
      venueItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    } else if (section === "av") {
      avItems.forEach((item) => {
        totalCost += item.cost * item.quantity;
      });
    }
    return totalCost;
  };
  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");

  return (
    <>
      <navbar className={styles.navbar_event_conference}>
        <div className={styles.company_logo}>Conference Expense Planner</div>
        <div className={styles.left_navbar}>
          <div className={styles.nav_links}>
            <a href="#venue">Venue</a>
            <a href="#addons">Add-ons</a>
            <a href="#meals">Meals</a>
          </div>
          <button className={styles.details_button}>Show Details</button>
        </div>
      </navbar>
      <div className={styles.main_container}>
        <div className={styles.items_information}>
          <div id="venue" className={styles.venue_container}>
            <div className={styles.text}>
              <h1>Venue Room Selection</h1>
            </div>
            <div className={styles.venue_selection}>
              {venueItems.map((item, index) => (
                <div className="venue_main" key={index}>
                  <div className={styles.img}>
                    <img
                      className={styles.pictures}
                      src={item.img}
                      alt={item.name}
                    />
                  </div>
                  <div className="text">{item.name}</div>
                  <div>${item.cost}</div>
                  <div className="button_container">
                    {venueItems[index].name ===
                    "Auditorium Hall (Capacity:200)" ? (
                      <>
                        <button
                          className={
                            venueItems[index].quantity === 0
                              ? "styles.btn_warning btn-disabled"
                              : "btn-minus btn-warning"
                          }
                          onClick={() => handleRemoveFromCart(index)}
                        >
                          &#8211;
                        </button>
                        <span className="selected_count">
                          {venueItems[index].quantity > 0
                            ? ` ${venueItems[index].quantity}`
                            : "0"}
                        </span>
                        <button
                          className={
                            remainingAuditoriumQuantity === 0
                              ? "btn-success btn-disabled"
                              : "btn-success btn-plus"
                          }
                          onClick={() => handleAddToCart(index)}
                        >
                          &#43;
                        </button>
                      </>
                    ) : (
                      <div className="button_container">
                        <button
                          className={
                            venueItems[index].quantity === 0
                              ? " btn-warning btn-disabled"
                              : "btn-warning btn-plus"
                          }
                          onClick={() => handleRemoveFromCart(index)}
                        >
                          &#8211;
                        </button>
                        <span className="selected_count">
                          {venueItems[index].quantity > 0
                            ? ` ${venueItems[index].quantity}`
                            : "0"}
                        </span>
                        <button
                          className={
                            venueItems[index].quantity === 10
                              ? " btn-success btn-disabled"
                              : "btn-success btn-plus"
                          }
                          onClick={() => handleAddToCart(index)}
                        >
                          &#43;
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.total_cost}>
              Total Cost: ${venueTotalCost}
            </div>
          </div>

          <div id="addons" className={styles.venue_container}>
            <div className={styles.text}>
              <h1> Add-ons Selection</h1>
            </div>
            <div className={styles.addons_selection}>
              {avItems.map((item, index) => (
                <div className="av_data venue_main" key={index}>
                  <div className="img">
                    <img
                      className={styles.pictures}
                      src={item.img}
                      alt={item.name}
                    />
                  </div>
                  <div className="text"> {item.name} </div>
                  <div> ${item.cost} </div>
                  <div className={styles.addons_btn}>
                    <button
                      className={styles.btn_warning}
                      onClick={() => handleDecrementAvQuantity(index)}
                    >
                      {" "}
                      &ndash;{" "}
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className={styles.btn_success}
                      onClick={() => handleIncrementAvQuantity(index)}
                    >
                      {" "}
                      &#43;{" "}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.total_cost}>Total Cost: ${avTotalCost}</div>
          </div>

          {/* Meal Section */}

          <div id="meals" className={styles.venue_container}>
            <div className={styles.text}>
              <h1>Meals Selection</h1>
            </div>

            <div className="input-container venue_selection">
              <label htmlFor="numberOfPeople">
                <h3>Number of People:</h3>
              </label>
              <input
                type="number"
                className="input_box5"
                id="numberOfPeople"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div className={styles.meal_selection}>
              {mealsItems.map((item, index) => (
                <div className="meal_item" key={index} style={{ padding: 15 }}>
                  <div className="inner">
                    <input
                      type="checkbox"
                      id={`meal_${index}`}
                      checked={item.selected}
                      onChange={() => handleMealSelection(index)}
                    />
                    <label htmlFor={`meal_${index}`}> {item.name} </label>
                  </div>
                  <div className="meal_cost">${item.cost}</div>
                </div>
              ))}
            </div>
            <div className={styles.total_cost}>Total Cost: </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConferenceEvents;
