import React from 'react';

const Marker = ({ description, objectives, title }) => (
  <section className="marker">
    <h2 className="marker__title">
      { title }
    </h2>
    <p className="marker__description">
      { description }
    </p>
    <p className="marker__objective">
      { objectives }
    </p>
  </section>
);

export default Marker;
