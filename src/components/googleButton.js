import { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';

export function GoogleButton() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
          <Button className="btn text-white btn-floating m-1" variant="danger" ref={target} style={{ backgroundColor: '#dd4b39' }} onClick={() => setShow(!show)}>
              <i className="bi bi-google"></i>
          </Button>

         
      <Overlay target={target.current} show={show} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'absolute',
                backgroundColor: '#dd4b39',
              padding: '2px 10px',
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
          >
            filippszemraj@gmail.com
          </div>
        )}
      </Overlay>
    </>
  );
}
