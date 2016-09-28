import React from 'react';

const PopupContent = ({ description, objectives, title }) => (
  <section className="content">
    <h2 className="content__title">
      { title }
    </h2>
    <p className="content__description">
      { description }
    </p>
    {( objectives ? (
      <div className="content__objective">
        <h3 className="content__subtitle">
          Objectives
        </h3>
        <p className="content__description">
          { objectives }
        </p>
      </div>
    ) : null )}
  </section>
);

export default PopupContent;
