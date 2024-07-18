import styles from "./ConferenceEvents.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../venueSlice";
import { useState } from "react";
import { decrementAvQuantity, incrementAvQuantity } from "../avSlice";
import { toggleMealSelection } from "../mealSlice";
import TotalCosts from "../Costs/TotalCosts";

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

  const handleToggleItems = () => {
    console.log("handleToggleItems called");
    setShowItems(!showItems);
  };

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
      dispatch(toggleMealSelection(index, newNumberOfPeople));
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
    } else if (section === "meals") {
      mealsItems.forEach((item) => {
        totalCost += item.cost * numberOfPeople;
      });
    }
    return totalCost;
  };
  const venueTotalCost = calculateTotalCost("venue");
  const avTotalCost = calculateTotalCost("av");
  const mealsTotalCost = calculateTotalCost("meals");

  const totalCosts = {
    venue: venueTotalCost,
    av: avTotalCost,
    meals: mealsTotalCost,
  };

  const getItemsFromTotalCost = () => {
    const items = [];
    venueItems.forEach((item) => {
      if (item.quantity > 0) {
        items.push({ ...item, type: "venue" });
      }
    });
    avItems.forEach((item) => {
      if (
        item.quantity > 0 &&
        !items.some((i) => i.name === item.name && i.type === "av")
      ) {
        items.push({ ...item, type: "av" });
      }
    });
    mealsItems.forEach((item) => {
      if (item.selected) {
        const itemForDisplay = { ...item, type: "meals" };
        if (item.numberOfPeople) {
          itemForDisplay.numberOfPeople = numberOfPeople;
        }
        items.push(itemForDisplay);
      }
    });
    return items;
  };
  const items = getItemsFromTotalCost();

  const ItemsDisplay = ({ items }) => {
    console.log(items);
    return (
      <>
        <div className={styles.display_box1}>
          {items.length === 0 && <p>No items selected</p>}
          <table className={styles.table_item_data}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>${item.cost}</td>
                  <td>
                    {item.type === "meals" || item.numberOfPeople
                      ? ` For ${numberOfPeople} people`
                      : item.quantity}
                  </td>
                  <td>
                    {item.type === "meals" || item.numberOfPeople
                      ? `${item.cost * numberOfPeople}`
                      : `${item.cost * item.quantity}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  const navigateToProducts = (idType) => {
    if (idType === "#venue" || idType === "#addons" || idType === "#meals") {
      if (showItems) {
        // Check if showItems is false
        setShowItems(!showItems); // Toggle showItems to true only if it's currently false
      }
    }
  };
  return (
    <>
      <navbar className={styles.navbar_event_conference}>
        <div className={styles.company_logo}>Conference Expense Planner</div>
        <div className={styles.left_navbar}>
          <div className={styles.nav_links}>
            <a href="#venue" onClick={() => navigateToProducts("#venue")}>
              Venue
            </a>
            <a href="#addons" onClick={() => navigateToProducts("#addons")}>
              Add-ons
            </a>
            <a href="#meals" onClick={() => navigateToProducts("#meals")}>
              Meals
            </a>
          </div>
          <button
            className={styles.details_button}
            onClick={() => setShowItems(!showItems)}
          >
            Show Details
          </button>
        </div>
      </navbar>
      <div className={styles.main_container}>
        {!showItems ? (
          <div className={styles.items_information}>
            <div id="venue" className={styles.venue_container}>
              <div className={styles.text}>
                <h1>Venue Room Selection</h1>
              </div>
              <div className={styles.venue_selection}>
                {venueItems.map((item, index) => (
                  <div className={styles.venue_main} key={index}>
                    <div className={styles.img}>
                      <img
                        className={styles.pictures}
                        src={item.img}
                        alt={item.name}
                      />
                    </div>
                    <div className="text">{item.name}</div>
                    <div>${item.cost}</div>
                    <div className={styles.button_container}>
                      {venueItems[index].name ===
                      "Auditorium Hall (Capacity:200)" ? (
                        <>
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? styles.btn_success
                                : styles.btn_warning
                            }
                            onClick={() => handleRemoveFromCart(index)}
                          >
                            &#8211;
                          </button>
                          <span className={styles.selected_count}>
                            {venueItems[index].quantity > 0
                              ? ` ${venueItems[index].quantity}`
                              : "0"}
                          </span>
                          <button
                            className={
                              remainingAuditoriumQuantity === 0
                                ? styles.btn_success
                                : styles.btn_warning
                            }
                            onClick={() => handleAddToCart(index)}
                          >
                            &#43;
                          </button>
                        </>
                      ) : (
                        <div className={styles.button_container}>
                          <button
                            className={
                              venueItems[index].quantity === 0
                                ? styles.btn_success
                                : styles.btn_warning
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
                                ? styles.btn_success
                                : styles.btn_warning
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
                        className={styles.btn_success}
                        onClick={() => handleDecrementAvQuantity(index)}
                      >
                        {" "}
                        &ndash;{" "}
                      </button>
                      <span className={styles.quantity_value}>
                        {item.quantity}
                      </span>
                      <button
                        className={styles.btn_warning}
                        onClick={() => handleIncrementAvQuantity(index)}
                      >
                        {" "}
                        &#43;{" "}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.total_cost}>
                Total Cost: ${avTotalCost}
              </div>
            </div>

            {/* Meal Section */}

            <div id="meals" className={styles.venue_container}>
              <div className={styles.text}>
                <h1>Meals Selection</h1>
              </div>

              <div className={styles.input_container}>
                <label htmlFor="numberOfPeople">
                  <h3>Number of People:</h3>
                </label>
                <input
                  type="number"
                  className={styles.input_box5}
                  id="numberOfPeople"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                  min="1"
                />
              </div>
              <div className={styles.meal_selection}>
                {mealsItems.map((item, index) => (
                  <div
                    className={styles.meal_item}
                    key={index}
                    style={{ padding: 15 }}
                  >
                    <div className="inner">
                      <input
                        type="checkbox"
                        id={`meal_${index}`}
                        checked={item.selected}
                        onChange={() => handleMealSelection(index)}
                      />
                      <label htmlFor={`meal_${index}`}> {item.name} </label>
                    </div>
                    <div className={styles.meal_cost}>${item.cost}</div>
                  </div>
                ))}
              </div>
              <div className={styles.total_cost}>
                Total Cost: {mealsTotalCost}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.total_amount_detail}>
            <TotalCosts
              totalCosts={totalCosts}
              handleClick={handleToggleItems}
              ItemsDisplay={() => <ItemsDisplay items={items} />}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ConferenceEvents;
