import React from 'react';
import './../App.css';

function DisplayMessages(props) {
  return (
    <div className="split right">
      <h2 className="calculation-messages-header">Live calculations feed</h2>
      <div id="history"></div>
      <div id='message-container'>
        {
          props.data.map((data) => 
            <div key={data.time}>
              <span className="calculation-messages-date">{new Date(data.time).toLocaleTimeString("en-US")} </span>
              <span>{data.message}</span>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default DisplayMessages;
