import styles from "./ConferenceEvents.module.scss";
const ConferenceEvents = () => {
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
          <div id="venue" className="venue_container container_main">
            <div className={styles.text}>
              <h1>Venue Room Selection</h1>
            </div>
            <div className={styles.venue_selection}></div>
            <div className={styles.total_cost}>Total Cost: </div>
          </div>

          <div id="addons" className="venue_container container_main">
            <div className={styles.text}>
              <h1> Add-ons Selection</h1>
            </div>
            <div className="addons_selection"></div>
            <div className={styles.total_cost}>Total Cost:</div>
          </div>

          {/* Meal Section */}

          <div id="meals" className="venue_container container_main">
            <div className={styles.text}>
              <h1>Meals Selection</h1>
            </div>

            <div className="input-container venue_selection"></div>
            <div className={styles.meal_selection}></div>
            <div className={styles.total_cost}>Total Cost: </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConferenceEvents;
