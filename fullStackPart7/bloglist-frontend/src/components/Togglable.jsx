import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const visibility = { display: visible ? "none" : "" };
  const visibility2 = { display: visible ? "" : "none" };

  useImperativeHandle(refs, () => {
    return { setVisible };
  });

  return (
    <>
      <div style={visibility}>
        <button onClick={() => setVisible(true)}> {props.buttonName}</button>
      </div>

      <div style={visibility2}>
        {props.children}
        <button onClick={() => setVisible(false)}> Cancel</button>
      </div>
    </>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonName: PropTypes.string.isRequired,
};

export default Togglable;
