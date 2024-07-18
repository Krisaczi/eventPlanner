import React, { useState, useEffect } from "react";
import styles from "./TotalCosts.module.scss";
const TotalCosts = ({ totalCosts, ItemsDisplay }) => {
  const total_amount = totalCosts.venue + totalCosts.av + totalCosts.meals;
  return (
    <div className={styles.pricing_app}>
      <div className={styles.display_box}>
        <div className={styles.header}>
          <p className={styles.preheading}>
            <h3>Total cost for the event</h3>
          </p>
        </div>
        <div>
          <h2 id="pre_fee_cost_display" className={styles.price}>
            {" "}
            ${total_amount}
          </h2>
          <div className={styles.render_items}>
            {" "}
            <ItemsDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TotalCosts;
